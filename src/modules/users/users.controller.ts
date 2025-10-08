import { Body, Controller, Get, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ToggleUsersAnonimityDto, UpdateUserDto, UpdateUsersRoleDto, UpsertUserDto } from './users.dto';
import { ToggleUsersAnonimityResponse } from './users.responses';

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

  @Get("get-anonimity")
  async getAnonimity(
    @Query("channelId") channelId: number,
    @Query("tgid") tgid: string,
  ) {
    return await this.usersService.getAnonimity({ channelId, tgid });
  }

  @Post("toggle-anonimity")
  async toggleAnonimity(@Body() body: ToggleUsersAnonimityDto): Promise<ToggleUsersAnonimityResponse> {
    return await this.usersService.toggleAnonimity(body);
  }

  @Get("role")
  async getUsersRole(
    @Query("channelId") channelId: number,
    @Query("tgid") tgid: string,
  ) {
    return await this.usersService.getUsersRole({ channelId, tgid });
  }

  @Patch("update-role")
  async updateUsersRole(@Body() body: UpdateUsersRoleDto) {
    await this.usersService.updateUsersRole(body);
  }
}
