import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto, UpdateChannelDto } from './channels.dto';
import { Channel } from '@prisma/client';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) { }

  @Patch(":id")
  async update(@Param(":id") id: number, @Body() body: UpdateChannelDto) {
    return await this.channelsService.update(id, body);
  }

  @Post()
  async create(@Body() body: CreateChannelDto): Promise<Channel> {
    return await this.channelsService.create(body);
  }
}
