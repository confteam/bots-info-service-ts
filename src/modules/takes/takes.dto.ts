import { TakeStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class TakeDto {
  @IsString()
  messageId: string;

  @Type(() => Number)
  @IsNumber()
  channelId: number;
}

export class CreateTakeDto extends TakeDto {
  @IsString()
  userTgId: string;
}

export class UpdateTakeStatusDto {
  @IsEnum(TakeStatus)
  status: TakeStatus;
}
