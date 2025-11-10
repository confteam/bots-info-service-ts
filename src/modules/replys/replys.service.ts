import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReplyDto } from './replys.dto';
import { Reply } from '@prisma/client';

@Injectable()
export class ReplysService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create({ takeId, userMessageId, adminMessageId }: CreateReplyDto): Promise<number> {
    const reply = await this.prisma.reply.create({
      data: {
        takeId,
        userMessageId,
        adminMessageId,
      }
    });

    return reply.id;
  }

  async getByMsgId(messageId: string): Promise<Reply | null> {
    return await this.prisma.reply.findFirst({
      where: {
        OR: [
          { adminMessageId: messageId },
          { userMessageId: messageId }
        ]
      },
    });
  }
}
