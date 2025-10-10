import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto, UpdateChannelDto } from './channels.dto';
import { Channel } from '@prisma/client';

@Injectable()
export class ChannelsService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async update(id: number, dto: UpdateChannelDto) {
    return await this.prisma.channel.update({
      where: { id },
      data: {
        adminChatId: dto.adminChatId ?? null,
        channelChatId: dto.channelChatId ?? null,
        discussionChatId: dto.discussionChatId ?? null
      }
    });
  }

  async create(dto: CreateChannelDto): Promise<Channel> {
    const channel = await this.prisma.channel.create({
      data: {
        code: dto.code,
        adminChatId: dto.adminChatId ?? null,
        channelChatId: dto.channelChatId ?? null,
        discussionChatId: dto.discussionChatId ?? null,
      },
    });

    await this.prisma.bot.update({
      where: { tgid_type: { tgid: dto.botTgId, type: dto.botType } },
      data: { channelId: channel.id },
    });

    return channel;
  }
}
