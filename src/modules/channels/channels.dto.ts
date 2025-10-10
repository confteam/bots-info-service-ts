import { Type } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

class ChannelChats {
  @IsOptional()
  @IsString()
  adminChatId?: string;

  @IsOptional()
  @IsString()
  channelChatId?: string;

  @IsOptional()
  @IsString()
  discussionChatId?: string;
}

export class UpdateChannelDto extends ChannelChats { }

export class CreateChannelDto extends ChannelChats {
  @IsString()
  botTgId: string;

  @IsEnum(Type)
  botType: Type;

  @IsString()
  code: string;
}
