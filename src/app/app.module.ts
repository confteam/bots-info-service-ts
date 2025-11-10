import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpLoggerMiddleware } from 'src/common/middlewares/httpLogger.middleware';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BotsModule } from 'src/modules/bots/bots.module';
import { ChannelsModule } from 'src/modules/channels/channels.module';
import { UsersModule } from 'src/modules/users/users.module';
import { TakesModule } from 'src/modules/takes/takes.module';
import { ReplysModule } from 'src/modules/replys/replys.module';

@Module({
  imports: [
    PrismaModule,
    BotsModule,
    ChannelsModule,
    UsersModule,
    TakesModule,
    ReplysModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes("*");
  }
}
