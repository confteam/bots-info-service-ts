import { Type } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class AuthBotDto {
  @IsString()
  tgid: string;

  @IsEnum(Type)
  type: Type;
}
