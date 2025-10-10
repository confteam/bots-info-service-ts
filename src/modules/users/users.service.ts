import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  UpdateUserDto,
  UpsertUserDto,
  UpdateUserRoleDto,
  UserChannelDto
} from './users.dto';
import { Role, UserChannel } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async upsert(tgid: string, dto: UpsertUserDto) {
    const user = await this.prisma.user.findUnique({ where: { tgid } });

    await this.prisma.user.upsert({
      where: { tgid },
      update: {
        chatId: user?.chatId ?? dto.chatId ?? null,
        channels: {
          upsert: {
            where: { userId_channelId: { userId: user?.id ?? 0, channelId: dto.channelId } },
            update: { role: dto.role },
            create: { channel: { connect: { id: dto.channelId } }, role: dto.role },
          },
        },
      },
      create: {
        tgid,
        chatId: dto.chatId ?? null,
        channels: { create: { channel: { connect: { id: dto.channelId } }, role: dto.role } },
      },
    });
  }

  async update(tgid: string, data: Partial<UpdateUserDto>) {
    await this.prisma.user.update({ where: { tgid }, data });
  }

  private async getUserChannel({ tgid, channelId }: UserChannelDto): Promise<UserChannel> {
    const user = await this.prisma.user.findUnique({ where: { tgid } });
    if (!user) throw new NotFoundException('User not found');

    const userChannel = await this.prisma.userChannel.findFirst({ where: { userId: user.id, channelId } });
    if (!userChannel) throw new NotFoundException('UserChannel not found');

    return userChannel;
  }

  async getUserAnonimity({ tgid, channelId }: UserChannelDto): Promise<boolean> {
    const userChannel = await this.getUserChannel({ tgid, channelId });
    return userChannel.anonimity;
  }

  async toggleUserAnonimity({ tgid, channelId }: UserChannelDto): Promise<boolean> {
    const userChannel = await this.getUserChannel({ tgid, channelId });
    const anonimity = !userChannel.anonimity;

    await this.prisma.userChannel.update({ where: { id: userChannel.id }, data: { anonimity } });
    return anonimity;
  }

  async getUserRole({ tgid, channelId }: UserChannelDto): Promise<Role> {
    const userChannel = await this.getUserChannel({ tgid, channelId });
    return userChannel.role;
  }

  async updateUserRole({ tgid, channelId }: UserChannelDto, dto: UpdateUserRoleDto) {
    const userChannel = await this.getUserChannel({ tgid, channelId });
    await this.prisma.userChannel.update({ where: { id: userChannel.id }, data: { role: dto.role } });
  }
}
