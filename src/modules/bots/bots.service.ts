import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthBotDto } from './bots.dto';
import { AuthBotResponse } from './bots.response';

@Injectable()
export class BotsService {
  private readonly logger = new Logger(BotsService.name);

  constructor(private readonly prisma: PrismaService) { }

  async auth(dto: AuthBotDto): Promise<AuthBotResponse> {
    try {
      const { tgid, type } = dto;

      let bot = await this.prisma.bot.findUnique({
        where: { tgid_type: { tgid, type } },
        include: { channel: true }
      });

      if (!bot) {
        bot = await this.prisma.bot.create({
          data: { tgid, type },
          include: { channel: true }
        });
      }

      return { bot };
    } catch (err) {
      this.logger.error(`Failed to auth bot: ${err.message}`, err.stack);
      throw err;
    }
  }
}
