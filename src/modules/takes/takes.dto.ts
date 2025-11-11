import { TakeStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';


export class TakeQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  messageId?: string;

  @Type(() => Number)
  @IsNumber()
  channelId: number;
}

export class TakeIdDto {
  @Type(() => Number)
  @IsNumber()
  id: number;

  @Type(() => Number)
  @IsNumber()
  channelId: number;
}

export class TakeMsgIdDto {
  @IsString()
  messageId: string;

  @Type(() => Number)
  @IsNumber()
  channelId: number;
}

export class CreateTakeDto {
  @IsString()
  userTgId: string;

  @IsString()
  adminMessageId: string;

  @IsString()
  userMessageId: string;

  @Type(() => Number)
  @IsNumber()
  channelId: number;
}

export class UpdateTakeStatusDto {
  @IsEnum(TakeStatus)
  status: TakeStatus;
}
