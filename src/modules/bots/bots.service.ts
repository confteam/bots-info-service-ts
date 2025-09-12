import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthBotDto } from './bots.dto';
import { AuthBotResponse } from './bots.responses';
import { Bot } from '@prisma/client';
import { nanoid } from 'nanoid';

@Injectable()
export class BotsService {
  private readonly logger = new Logger(BotsService.name);

  constructor(private readonly prisma: PrismaService) { }

  async auth(dto: AuthBotDto): Promise<AuthBotResponse> {
    try {
      let bot: Bot;

      const existsBot = await this.prisma.bot.findUnique({
        where: { tgid: dto.tgid }
      });

      if (!existsBot) {
        const newBot = await this.prisma.bot.create({
          data: {
            tgid: dto.tgid,
            type: dto.type,
            code: nanoid(6)
          }
        });

        bot = newBot;
      } else {
        bot = existsBot;
      }

      return { bot: bot }
    } catch (err) {
      this.logger.error(`Failed to auth bot: ${err.message}`, err.stack);
      throw err;
    }
  }
}
