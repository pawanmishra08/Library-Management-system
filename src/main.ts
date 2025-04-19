import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from './guard/auth/authguard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  //app instances is created here!
  const app = await NestFactory.create(AppModule ,);

  //all middlewares are registered here!
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new AuthGuard(
      new JwtService(),
      new Reflector(),
    ))

  //app listens and application starts here!
  await app.listen(3000);
}
bootstrap();
