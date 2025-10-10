import { Body, Controller, Post } from '@nestjs/common';
import { BotsService } from './bots.service';
import { AuthBotDto } from './bots.dto';
import { Bot } from '@prisma/client';

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) { }

  @Post()
  async auth(@Body() body: AuthBotDto): Promise<Bot> {
    return await this.botsService.auth(body);
  }
}
