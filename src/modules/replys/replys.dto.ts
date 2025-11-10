import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateReplyDto {
  @Type(() => Number)
  @IsNumber()
  takeId: number;

  @IsString()
  userMessageId: string;
  @IsString()
  adminMessageId: string;
}
