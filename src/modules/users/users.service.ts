import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUsersRoleDto, GetUsersAnonimityDto, ToggleUsersAnonimityDto, UpdateUserDto, UpsertUserDto, UpdateUsersRoleDto } from './users.dto';
import { GetUsersRoleResponse, GetUsersAnonimityResponse, ToggleUsersAnonimityResponse } from './users.responses';
import { UserChannel } from '@prisma/client';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async upsert(dto: UpsertUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { tgid: dto.tgid }
      });

      await this.prisma.user.upsert({
        where: { tgid: dto.tgid },
        // если нашли юзера
        update: {
          // апдейтим связь канала с пользователем
          channels: {
            upsert: {
              // ищем связь пользователя с каналом
              where: {
                userId_channelId: {
                  userId: user?.id ?? 0,
                  channelId: dto.channelId
                }
              },
              // если нашли меняем роль
              update: { role: dto.role },
              // если не нашли привязываем пользователя к каналу
              create: {
                channel: { connect: { id: dto.channelId } },
                role: dto.role
              }
            }
          },
          ...(user?.chatId === null && dto.chatId ? { chatId: dto.chatId } : {}),
        },
        // если не нашли создаем
        create: {
          tgid: dto.tgid,
          chatId: dto.chatId || null,
          channels: {
            // привязываем к каналу и ставим роль
            create: {
              channel: { connect: { id: dto.channelId } },
              role: dto.role
            }
          }
        },
      });
    } catch (err) {
      this.logger.error(`Failed to upsert user: ${err.message}`, err.stack);
      throw err;
    }
  }

  async update(tgid: string, data: Partial<UpdateUserDto>) {
    try {
      await this.prisma.user.update({
        where: { tgid },
        data
      })
    } catch (err) {
      this.logger.error(`Failed to update user: ${err.message}`, err.stack);
      throw err;
    }
  }

  private async getUserChannelByUserTgId(tgid: string, channelId: number): Promise<UserChannel> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { tgid }
      });

      if (!user) throw new NotFoundException("User not found");

      const userChannel = await this.prisma.userChannel.findFirst({
        where: { userId: user.id, channelId }
      });

      if (!userChannel) throw new NotFoundException("UserChannel not found");

      return userChannel;
    } catch (err) {
      this.logger.error(`Failed to get user channel: ${err.message}`, err.stack);
      throw err;
    }
  }

  async getAnonimity(body: GetUsersAnonimityDto): Promise<GetUsersAnonimityResponse> {
    try {
      const userChannel = await this.getUserChannelByUserTgId(body.tgid, body.channelId);

      return { anonimity: userChannel.anonimity }
    } catch (err) {
      this.logger.error(`Failed to get user's anonimity: ${err.message}`, err.stack);
      throw err;
    }
  }

  async toggleAnonimity(body: ToggleUsersAnonimityDto): Promise<ToggleUsersAnonimityResponse> {
    try {
      const userChannel = await this.getUserChannelByUserTgId(body.tgid, body.channelId);
      const newAnonimity = !userChannel.anonimity;

      await this.prisma.userChannel.update({
        where: { id: userChannel.id },
        data: { anonimity: newAnonimity }
      });

      return { anonimity: newAnonimity }
    } catch (err) {
      this.logger.error(`Failed to toggle user's anonimity: ${err.message}`, err.stack);
      throw err;
    }
  }

  async getUsersRole(body: GetUsersRoleDto): Promise<GetUsersRoleResponse> {
    try {
      const userChannel = await this.getUserChannelByUserTgId(body.tgid, body.channelId);

      return { role: userChannel.role }
    } catch (err) {
      this.logger.error(`Failed to get user's role: ${err.message}`, err.stack);
      throw err;
    }
  }

  async updateUsersRole(body: UpdateUsersRoleDto) {
    try {
      const userChannel = await this.getUserChannelByUserTgId(body.tgid, body.channelId);

      await this.prisma.userChannel.update({
        where: { id: userChannel.id },
        data: {
          role: body.role
        }
      });
    } catch (err) {
      this.logger.error(`Failed to update user's role: ${err.message}`, err.stack);
      throw err;
    }
  }
}
