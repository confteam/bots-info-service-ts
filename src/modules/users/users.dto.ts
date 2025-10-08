import { Role } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

class UserDto {
  @IsString()
  tgid: string;

  @IsString()
  chatId: string;

  @IsOptional()
  @IsEnum(Role)
  role: Role;
}

export class UpsertUserDto extends UserDto {
  @IsNumber()
  channelId: number;
}

export class UpdateUserDto {
  @IsString()
  tgid: string;

  @IsOptional()
  @IsString()
  chatId: string;
}

export class GetUsersAnonimityDto {
  @IsNumber()
  channelId: number;

  @IsString()
  tgid: string;
}

export class ToggleUsersAnonimityDto extends GetUsersAnonimityDto { }

export class GetUsersRoleDto {
  @IsString()
  tgid: string;

  @IsNumber()
  channelId: number;
}

export class UpdateUsersRoleDto {
  @IsString()
  tgid: string;

  @IsNumber()
  channelId: number;

  @IsEnum(Role)
  role: Role;
}
