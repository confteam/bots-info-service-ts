import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { TakesService } from './takes.service';
import { CreateTakeDto, TakeIdDto, TakeMsgIdDto, UpdateTakeStatusDto } from './takes.dto';
import { GetTakeAuthorResponse } from './takes.responses';
import { Take } from '@prisma/client';

@Controller('takes')
export class TakesController {
  constructor(private readonly takesService: TakesService) { }

  @Post()
  async create(@Body() body: CreateTakeDto): Promise<number> {
    return await this.takesService.create(body);
  }

  @Patch("status")
  async updateStatus(@Query() query: TakeIdDto, @Body() body: UpdateTakeStatusDto) {
    await this.takesService.updateStatus(query, body);
  }

  @Get("author")
  async getTakeAuthor(@Query() query: TakeIdDto): Promise<GetTakeAuthorResponse> {
    return await this.takesService.getTakeAuthor(query);
  }

  @Get()
  async getTakeByMsgId(@Query() query: TakeMsgIdDto): Promise<Take> {
    return await this.takesService.getTakeByMsgId(query);
  }
}
