import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto, UpsertUserDto } from './users.dto';

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
}
