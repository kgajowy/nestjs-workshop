import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { logger } from './middlewares/logger.middleware';
import { UserMiddleware } from './middlewares/user.middleware';
import { UserService } from './services/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger, UserMiddleware)
      .forRoutes(UserController);
  }
}
