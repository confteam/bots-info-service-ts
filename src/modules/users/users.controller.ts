import { Body, Controller, Get, Patch, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { ToggleUserAnonimityDto, UpdateUserDto, UpdateUserRoleDto, UpsertUserDto } from './users.dto';
import { Role } from '@prisma/client';

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

  @Get("anonimity")
  async getUserAnonimity(
    @Query("channelId") channelId: number,
    @Query("tgid") tgid: string,
  ) {
    return await this.usersService.getUserAnonimity({ channelId, tgid });
  }

  @Post("toggle-anonimity")
  async toggleUserAnonimity(@Body() body: ToggleUserAnonimityDto): Promise<Role> {
    return await this.usersService.toggleUserAnonimity(body);
  }

  @Get("role")
  async getUserRole(
    @Query("channelId") channelId: number,
    @Query("tgid") tgid: string,
  ) {
    return await this.usersService.getUserRole({ channelId, tgid });
  }

  @Patch("role")
  async updateUserRole(@Body() body: UpdateUserRoleDto) {
    await this.usersService.updateUserRole(body);
  }
}
