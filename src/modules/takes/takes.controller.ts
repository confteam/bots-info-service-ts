import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { TakesService } from './takes.service';
import { CreateTakeDto, TakeDto, UpdateTakeStatusDto } from './takes.dto';

@Controller('takes')
export class TakesController {
  constructor(private readonly takesService: TakesService) { }

  @Post()
  async create(@Body() body: CreateTakeDto) {
    await this.takesService.create(body);
  }

  @Patch("status")
  async updateStatus(@Query() query: TakeDto, @Body() body: UpdateTakeStatusDto) {
    await this.takesService.updateStatus(query, body);
  }

  @Get("author")
  async getAuthor(@Query() query: TakeDto) {
    return await this.takesService.getTakeAuthor(query);
  }
}
