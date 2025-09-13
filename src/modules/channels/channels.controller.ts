import { Body, Controller, Post, Put } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto, UpdateChannelDto } from './channels.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) { }

  @Put()
  async update(@Body() body: UpdateChannelDto) {
    return await this.channelsService.update(body);
  }

  @Post()
  async create(@Body() body: CreateChannelDto) {
    return await this.channelsService.create(body);
  }
}
