import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto, UpdateUserRoleDto, UpsertUserDto, UserChannelDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post(":tgid")
  async upsert(@Param(":tgid") tgid: string, @Body() body: UpsertUserDto) {
    await this.usersService.upsert(tgid, body);
  }

  @Patch(":tgid")
  async update(@Param(":tgid") tgid: string, @Body() body: UpdateUserDto) {
    await this.usersService.update(tgid, body);
  }

  @Get("anonimity")
  async getUserAnonimity(@Query() query: UserChannelDto) {
    return await this.usersService.getUserAnonimity(query);
  }

  @Patch("anonimity")
  async toggleUserAnonimity(@Query() query: UserChannelDto): Promise<boolean> {
    return await this.usersService.toggleUserAnonimity(query);
  }

  @Get("role")
  async getUserRole(@Query() query: UserChannelDto) {
    return await this.usersService.getUserRole(query);
  }

  @Patch("role")
  async updateUserRole(@Query() query: UserChannelDto, body: UpdateUserRoleDto) {
    await this.usersService.updateUserRole(query, body);
  }
}
