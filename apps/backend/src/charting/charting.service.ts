import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToothChart } from './chart.entity';
import { PeriodontalRecord } from './periodontal-record.entity';

@Injectable()
export class ChartingService {
  constructor(
    @InjectRepository(ToothChart) private toothRepository: Repository<ToothChart>,
    @InjectRepository(PeriodontalRecord) private periodontalRepository: Repository<PeriodontalRecord>,
  ) {}

  async findToothCharts(patientId: string): Promise<ToothChart[]> {
    return this.toothRepository.find({ where: { patientId } });
  }

  async findPeriodontalRecords(patientId: string): Promise<PeriodontalRecord[]> {
    return this.periodontalRepository.find({ where: { patientId } });
  }

  async createToothChart(payload: Partial<ToothChart>): Promise<ToothChart> {
    const chart = this.toothRepository.create(payload);
    return this.toothRepository.save(chart);
  }

  async createPeriodontalRecord(payload: Partial<PeriodontalRecord>): Promise<PeriodontalRecord> {
    const record = this.periodontalRepository.create(payload);
    return this.periodontalRepository.save(record);
  }
}
