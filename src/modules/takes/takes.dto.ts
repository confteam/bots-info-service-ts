import { TakeStatus } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTakeDto {
  @IsString()
  userTgId: string;

  @IsString()
  messageId: string;

  @IsNumber()
  channelId: number;
}

export class UpdateTakeStatusDto {
  @IsString()
  messageId: string;

  @IsEnum(TakeStatus)
  status: TakeStatus;
}

export class GetTakeAuthorDto {
  @IsString()
  messageId: string;

  @IsNumber()
  channelId: number;
}
