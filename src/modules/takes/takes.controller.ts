import { Body, Controller, Post } from '@nestjs/common';
import { TakesService } from './takes.service';
import { CreateTakeDto } from './takes.dto';

@Controller('takes')
export class TakesController {
  constructor(private readonly takesService: TakesService) { }

  @Post()
  async create(@Body() body: CreateTakeDto) {
    await this.takesService.create(body);
  }
}
