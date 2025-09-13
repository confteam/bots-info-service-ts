import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto, UpdateChannelDto } from './channels.dto';

@Injectable()
export class ChannelsService {
  private readonly logger = new Logger(ChannelsService.name);

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async update(dto: UpdateChannelDto) {
    try {
      return await this.prisma.channel.update({
        where: { id: dto.id },
        data: dto
      })
    } catch (err) {
      this.logger.error(`Failed to update channel: ${err.message}`, err.stack);
      throw err;
    }
  }

  async create(dto: CreateChannelDto) {
    try {
      const channel = await this.prisma.channel.create({
        data: {
          code: dto.code,
          adminChatId: dto.adminChatId,
          channelId: dto.channelId,
          discussionChatId: dto.disussionId
        }
      });

      await this.prisma.bot.update({
        where: { tgid_type: { tgid: dto.botTgId, type: dto.botType } },
        data: { channelId: channel.id }
      });

      return channel;
    } catch (err) {
      this.logger.error(`Failed to create channel: ${err.message}`, err.stack);
      throw err;
    }
  }
}
