import { Type } from "@prisma/client";
import { IsString } from "class-validator";

export class AuthBotDto {
  @IsString()
  tgid: string;

  @IsString()
  type: Type;
}
