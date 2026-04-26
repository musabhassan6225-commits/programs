import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulingController } from './scheduling.controller';
import { SchedulingService } from './scheduling.service';
import { ScheduleSlot } from './schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleSlot])],
  controllers: [SchedulingController],
  providers: [SchedulingService],
  exports: [SchedulingService],
})
export class SchedulingModule {}
