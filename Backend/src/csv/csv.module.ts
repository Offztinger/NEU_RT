import { Module } from '@nestjs/common';
import { CSVService } from './csv.service';
import { CSVController } from './csv.controller';
import { PrismaService } from 'src/core/database/prisma/prisma.service';

@Module({
  controllers: [CSVController],
  providers: [CSVService, PrismaService],
})
export class CSVModule { }