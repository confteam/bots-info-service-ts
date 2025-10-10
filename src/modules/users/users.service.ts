import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  GetUserRoleDto,
  GetUserAnonimityDto,
  ToggleUserAnonimityDto,
  UpdateUserDto,
  UpsertUserDto,
  UpdateUserRoleDto
} from './users.dto';
import { Role, UserChannel } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async upsert(dto: UpsertUserDto) {
    const user = await this.prisma.user.findUnique({ where: { tgid: dto.tgid } });

    await this.prisma.user.upsert({
      where: { tgid: dto.tgid },
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
        tgid: dto.tgid,
        chatId: dto.chatId ?? null,
        channels: { create: { channel: { connect: { id: dto.channelId } }, role: dto.role } },
      },
    });
  }

  async update(tgid: string, data: Partial<UpdateUserDto>) {
    await this.prisma.user.update({ where: { tgid }, data });
  }

  private async getUserChannel(tgid: string, channelId: number): Promise<UserChannel> {
    const user = await this.prisma.user.findUnique({ where: { tgid } });
    if (!user) throw new NotFoundException('User not found');

    const userChannel = await this.prisma.userChannel.findFirst({ where: { userId: user.id, channelId } });
    if (!userChannel) throw new NotFoundException('UserChannel not found');

    return userChannel;
  }

  async getUserAnonimity(dto: GetUserAnonimityDto): Promise<boolean> {
    const userChannel = await this.getUserChannel(dto.tgid, dto.channelId);
    return userChannel.anonimity;
  }

  async toggleUserAnonimity(dto: ToggleUserAnonimityDto): Promise<boolean> {
    const userChannel = await this.getUserChannel(dto.tgid, dto.channelId);
    const anonimity = !userChannel.anonimity;

    await this.prisma.userChannel.update({ where: { id: userChannel.id }, data: { anonimity } });
    return anonimity;
  }

  async getUserRole(dto: GetUserRoleDto): Promise<Role> {
    const userChannel = await this.getUserChannel(dto.tgid, dto.channelId);
    return userChannel.role;
  }

  async updateUserRole(dto: UpdateUserRoleDto) {
    const userChannel = await this.getUserChannel(dto.tgid, dto.channelId);
    await this.prisma.userChannel.update({ where: { id: userChannel.id }, data: { role: dto.role } });
  }
}
