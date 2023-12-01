import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { TypeOrmModule } from '@nestjs/typeorm';// prima data 
import { Reports } from './reports.entity'; // a doua oara 
@Module({
  imports:[TypeOrmModule.forFeature([Reports])],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
