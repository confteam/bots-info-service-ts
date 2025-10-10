import { TakeStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class TakeDto {
  @IsString()
  messageId: string;

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
