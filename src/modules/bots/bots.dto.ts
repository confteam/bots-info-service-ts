import { Type } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { BotRequest } from "src/common/types/botRequest";

export class AuthBotDto {
  @IsString()
  tgid: string;

  @IsEnum(Type)
  type: Type;
}

export class UpdateBotDto extends BotRequest {
  @IsOptional()
  @IsString()
  chatId: string;

  @IsOptional()
  @IsString()
  channelId: string;

  @IsOptional()
  @IsString()
  confession: string;
}
