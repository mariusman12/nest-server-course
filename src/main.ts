import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';
import { ComputerModule } from './computer/computer.module';
import { AppModule } from './app/app.module';
 const cookieSession = require('cookie-session')


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys:['asdasdasd']
  }))
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true
    })
  );
  await app.listen(3000);
}
bootstrap();
