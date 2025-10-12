import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

class UserDto {
  @IsOptional()
  @IsString()
  chatId?: string;
}

export class UserChannelDto {
  @IsString()
  tgid: string;

  @Type(() => Number)
  @IsNumber()
  channelId: number;
}

export class UpsertUserDto extends UserDto {
  @IsNumber()
  channelId: number;

  @IsEnum(Role)
  role: Role;
}

export class UpdateUserDto extends UserDto { }

export class UpdateUserRoleDto {
  @IsEnum(Role)
  role: Role;
}
