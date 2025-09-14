import { Type } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

class ChannelChats {
  @IsOptional()
  @IsString()
  adminChatId?: string;

  @IsOptional()
  @IsString()
  channelId?: string;

  @IsOptional()
  @IsString()
  discussionId?: string;
}

export class UpdateChannelDto extends ChannelChats {
  @IsNumber()
  id: number;
}

export class CreateChannelDto extends ChannelChats {
  @IsString()
  botTgId: string;

  @IsEnum(Type)
  botType: Type;

  @IsString()
  code: string;
}
