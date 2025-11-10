import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReplysService } from './replys.service';
import { CreateReplyDto } from './replys.dto';
import { Reply } from '@prisma/client';

@Controller('replys')
export class ReplysController {
  constructor(private readonly replysService: ReplysService) { }

  @Post()
  async create(@Body() body: CreateReplyDto): Promise<number> {
    return await this.replysService.create(body);
  }

  @Get()
  async getByMsgId(@Query("messageId") messageId: string): Promise<Reply | null> {
    return await this.replysService.getByMsgId(messageId);
  }
}
