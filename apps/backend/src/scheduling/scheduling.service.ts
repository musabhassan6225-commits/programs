import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ScheduleSlot } from './schedule.entity';

@Injectable()
export class SchedulingService {
  constructor(@InjectRepository(ScheduleSlot) private scheduleRepository: Repository<ScheduleSlot>) {}

  async getSlots(clinicId?: string) {
    return this.scheduleRepository.find({ where: clinicId ? { clinicId } : {} });
  }

  async createSlot(payload: Partial<ScheduleSlot>) {
    const slot = this.scheduleRepository.create(payload);
    return this.scheduleRepository.save(slot);
  }
}
