import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { ScheduleSlot } from './schedule.entity';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Get('slots')
  async slots(@Query('clinicId') clinicId?: string): Promise<ScheduleSlot[]> {
    return this.schedulingService.getSlots(clinicId);
  }

  @Post('slot')
  async createSlot(@Body() payload: Partial<ScheduleSlot>): Promise<ScheduleSlot> {
    return this.schedulingService.createSlot(payload);
  }
}
