import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTakeDto, GetTakeAuthorDto, UpdateTakeStatusDto } from './takes.dto';
import { GetTakeAuthorResponse } from './takes.responses';

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

  async updateStatus(dto: UpdateTakeStatusDto): Promise<void> {
    const take = await this.prisma.take.findFirst({
      where: { messageId: dto.messageId },
    });
    if (!take) throw new NotFoundException('Take not found');

    await this.prisma.take.update({
      where: { id: take.id },
      data: { status: dto.status },
    });
  }

  async getTakeAuthor(dto: GetTakeAuthorDto): Promise<GetTakeAuthorResponse> {
    const take = await this.prisma.take.findFirst({
      where: { channelId: dto.channelId, messageId: dto.messageId },
    });
    if (!take) throw new NotFoundException('Take not found');

    const userChannel = await this.prisma.userChannel.findUnique({
      where: { id: take.userChannelId },
    });
    if (!userChannel) throw new NotFoundException('UserChannel not found');

    const author = await this.prisma.user.findUnique({
      where: { id: userChannel.userId },
    });
    if (!author) throw new NotFoundException('User not found');

    return { userId: author.tgid, chatId: author.chatId ?? null };
  }
}
