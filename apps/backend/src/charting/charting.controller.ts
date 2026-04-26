import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChartingService } from './charting.service';
import { PeriodontalRecord } from './periodontal-record.entity';
import { ToothChart } from './chart.entity';

@Controller('charting')
export class ChartingController {
  constructor(private readonly chartingService: ChartingService) {}

  @Get('tooth/:patientId')
  async getToothCharts(@Param('patientId') patientId: string): Promise<ToothChart[]> {
    return this.chartingService.findToothCharts(patientId);
  }

  @Get('periodontal/:patientId')
  async getPeriodontalRecords(@Param('patientId') patientId: string): Promise<PeriodontalRecord[]> {
    return this.chartingService.findPeriodontalRecords(patientId);
  }

  @Post('tooth')
  async createToothChart(@Body() payload: Partial<ToothChart>): Promise<ToothChart> {
    return this.chartingService.createToothChart(payload);
  }

  @Post('periodontal')
  async createPeriodontalRecord(@Body() payload: Partial<PeriodontalRecord>): Promise<PeriodontalRecord> {
    return this.chartingService.createPeriodontalRecord(payload);
  }
}
