import { Body, Controller, Post } from '@nestjs/common';
import { BotsService } from './bots.service';
import { AuthBotDto } from './bots.dto';
import { AuthBotResponse } from './bots.responses';

@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) { }

  @Post()
  async auth(@Body() body: AuthBotDto): Promise<AuthBotResponse> {
    return await this.botsService.auth(body);
  }
}
