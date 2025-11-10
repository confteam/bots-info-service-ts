import { Module } from '@nestjs/common';
import { ReplysService } from './replys.service';
import { ReplysController } from './replys.controller';

@Module({
  controllers: [ReplysController],
  providers: [ReplysService],
})
export class ReplysModule {}
