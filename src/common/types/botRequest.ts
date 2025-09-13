import { IsString } from "class-validator";

export class BotRequest {
  @IsString()
  tgid: string;
}
