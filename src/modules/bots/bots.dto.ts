import { Type } from '@prisma/client';
import { IsString, IsEnum } from 'class-validator';

export class AuthBotDto {
  @IsString()
  tgid: string;

  @IsEnum(Type)
  type: Type;
}
