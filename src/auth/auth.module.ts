import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.register({
      global:true,
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: process.env.EXPIRES_IN,},
    }),
  ],

})
export class AuthModule {}
