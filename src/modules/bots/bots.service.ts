import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthBotDto } from './bots.dto';
import { Bot } from '@prisma/client';

@Injectable()
export class BotsService {
  constructor(private readonly prisma: PrismaService) { }

  async auth(dto: AuthBotDto): Promise<Bot> {
    const { tgid, type } = dto;

    let bot = await this.prisma.bot.findUnique({
      where: { tgid_type: { tgid, type } },
      include: { channel: true },
    });

    if (!bot) {
      bot = await this.prisma.bot.create({
        data: { tgid, type },
        include: { channel: true },
      });
    }

    return bot;
  }
}
