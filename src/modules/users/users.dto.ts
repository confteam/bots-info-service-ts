import { Role } from "@prisma/client";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class UpsertUserDto {
  @IsString()
  tgid: string;

  @IsNumber()
  channelId: number;

  @IsEnum(Role)
  role: Role;
}
