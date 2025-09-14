import { Body, Controller, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UpsertUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async upsert(@Body() body: UpsertUserDto) {
    await this.usersService.upsert(body);
  }

  @Put()
  async update(@Body() body: UpdateUserDto) {
    await this.usersService.update(body.tgid, body);
  }
}
