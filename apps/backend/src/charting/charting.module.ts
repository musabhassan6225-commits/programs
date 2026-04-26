import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChartingService } from './charting.service';
import { ChartingController } from './charting.controller';
import { ToothChart } from './chart.entity';
import { PeriodontalRecord } from './periodontal-record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ToothChart, PeriodontalRecord])],
  providers: [ChartingService],
  controllers: [ChartingController],
  exports: [ChartingService],
})
export class ChartingModule {}
