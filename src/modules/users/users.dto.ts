import { Role } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

class UserDto {
  @IsString()
  tgid: string;

  @IsString()
  chatId: string;

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

  @IsOptional()
  @IsString()
  role: Role;
}

export class GetUsersAnonimityDto {
  @IsNumber()
  channelId: number;

  @IsString()
  tgid: string;
}

export class ToggleUsersAnonimityDto extends GetUsersAnonimityDto { }
