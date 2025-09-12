import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpLoggerMiddleware } from 'src/common/middlewares/httpLogger.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsModule } from 'src/modules/bots/bots.module';

@Module({
  imports: [
    PrismaModule,
    BotsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes("*");
  }
}
