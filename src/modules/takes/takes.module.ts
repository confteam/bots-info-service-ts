import { Module } from '@nestjs/common';
import { TakesService } from './takes.service';
import { TakesController } from './takes.controller';

@Module({
  controllers: [TakesController],
  providers: [TakesService],
})
export class TakesModule {}
