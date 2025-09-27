import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTakeDto, GetTakesAuthorDto, UpdateTakeStatusDto } from './takes.dto';
import { GetTakesAuthorResponse } from './takes.responses';

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

  async updateStatus(dto: UpdateTakeStatusDto) {
    try {
      const take = await this.prisma.take.findFirst({
        where: { messageId: dto.messageId }
      });

      if (!take) throw new NotFoundException("Take not found");

      await this.prisma.take.update({
        where: { id: take.id },
        data: { status: dto.status }
      });
    } catch (err) {
      this.logger.error(`Failed to update take status: ${err.message}`, err.stack);
      throw err;
    }
  }

  async getTakesAuthor(dto: GetTakesAuthorDto): Promise<GetTakesAuthorResponse> {
    try {
      const take = await this.prisma.take.findFirst({
        where: { channelId: dto.channelId, messageId: dto.messageId }
      });

      if (!take) throw new NotFoundException("Take not found");

      const userChannel = await this.prisma.userChannel.findFirst({
        where: { id: take.userChannelId }
      });

      if (!userChannel) throw new NotFoundException("UserChannel not found");

      const author = await this.prisma.user.findFirst({
        where: { id: userChannel.userId }
      });

      if (!author) throw new NotFoundException("User not found");

      return { chatId: author?.chatId }
    } catch (err) {
      this.logger.error(`Failed to get take's author: ${err.message}`, err.stack);
      throw err;
    }
  }
}
