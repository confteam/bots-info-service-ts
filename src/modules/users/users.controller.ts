import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpsertUserDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async upsert(@Body() body: UpsertUserDto) {
    await this.usersService.upsert(body);
  }
}
