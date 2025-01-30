import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { PublishersModule } from './publishers/publishers.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [PrismaModule, BooksModule, PublishersModule, MembersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
