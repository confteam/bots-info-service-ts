import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTakeDto, TakeDto, UpdateTakeStatusDto } from './takes.dto';
import { GetTakeAuthorResponse } from './takes.responses';
import { Take } from '@prisma/client';

@Injectable()
export class TakesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateTakeDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { tgid: dto.userTgId },
    });
    if (!user) throw new NotFoundException('User not found');

    const userChannel = await this.prisma.userChannel.findUnique({
      where: { userId_channelId: { userId: user.id, channelId: dto.channelId } },
    });
    if (!userChannel) throw new NotFoundException('User is not a member of this channel');

    await this.prisma.take.create({
      data: {
        messageId: dto.messageId,
        userChannelId: userChannel.id,
        channelId: dto.channelId,
      },
    });
  }

  private async getTake({ channelId, messageId }: TakeDto): Promise<Take> {
    const take = await this.prisma.take.findFirst({
      where: { channelId, messageId }
    });
    if (!take) throw new NotFoundException("Take not found");

    return take;
  }

  async updateStatus({ channelId, messageId }: TakeDto, dto: UpdateTakeStatusDto): Promise<void> {
    const take = await this.getTake({ channelId, messageId });

    await this.prisma.take.update({
      where: { id: take.id },
      data: { status: dto.status },
    });
  }

  async getTakeAuthor({ messageId, channelId }: TakeDto): Promise<GetTakeAuthorResponse> {
    const take = await this.getTake({ messageId, channelId });

    const userChannel = await this.prisma.userChannel.findUnique({
      where: { id: take.userChannelId },
      include: { user: true },
    });

    if (!userChannel || !userChannel.user) throw new NotFoundException('Author not found');

    return { userTgId: userChannel.user.tgid, chatId: userChannel.user.chatId ?? null };
  }
}
