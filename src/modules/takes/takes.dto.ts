import { TakeStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

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

export class CreateTakeDto extends TakeMsgIdDto {
  @IsString()
  userTgId: string;
}

export class UpdateTakeStatusDto {
  @IsEnum(TakeStatus)
  status: TakeStatus;
}
