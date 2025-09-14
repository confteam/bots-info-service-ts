import { Role } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class UpsertUserDto {
  @IsString()
  tgid: string;

  @IsString()
  channelId: number;

  @IsEnum(Role)
  role: Role;
}
