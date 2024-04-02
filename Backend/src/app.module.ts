import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './core/database/prisma/prisma.service';
import { configRoot } from './core/config/configurations';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';


@Module({
  //Los modulos se importan después de "DatabaseModule"
  imports: [ConfigModule.forRoot(configRoot()), DatabaseModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
