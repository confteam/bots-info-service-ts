import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { TakesService } from './takes.service';
import { CreateTakeDto, UpdateTakeStatusDto } from './takes.dto';

@Controller('takes')
export class TakesController {
  constructor(private readonly takesService: TakesService) { }

  @Post()
  async create(@Body() body: CreateTakeDto) {
    await this.takesService.create(body);
  }

  @Patch()
  async updateStatus(@Body() body: UpdateTakeStatusDto) {
    await this.takesService.updateStatus(body);
  }

  @Get("author")
  async getAuthor(
    @Query("messageId") messageId: string,
    @Query("channelId") channelId: number
  ) {
    return await this.takesService.getTakeAuthor({ messageId, channelId });
  }
}
