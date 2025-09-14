import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTakeDto } from './takes.dto';

@Injectable()
export class TakesService {
  private readonly logger = new Logger(TakesService.name);

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(dto: CreateTakeDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { tgid: dto.userTgId }
      });

      if (!user) throw new NotFoundException("User not found");

      const userChannel = await this.prisma.userChannel.findUnique({
        where: {
          userId_channelId: {
            userId: user.id,
            channelId: dto.channelId
          }
        }
      });

      if (!userChannel) throw new NotFoundException("User isn't member of this channel");

      await this.prisma.take.create({
        data: {
          messageId: dto.messageId,
          userChannelId: userChannel.id,
          channelId: dto.channelId
        }
      });
    } catch (err) {
      this.logger.error(`Failed to create take: ${err.message}`, err.stack);
      throw err;
    }
  }
}
