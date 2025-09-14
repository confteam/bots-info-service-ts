import { IsNumber, IsString } from "class-validator";

export class CreateTakeDto {
  @IsString()
  userTgId: string;

  @IsString()
  messageId: string;

  @IsNumber()
  channelId: number;
}
