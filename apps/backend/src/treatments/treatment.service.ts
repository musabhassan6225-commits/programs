import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TreatmentPlan } from './treatment-plan.entity';

@Injectable()
export class TreatmentService {
  constructor(@InjectRepository(TreatmentPlan) private planRepository: Repository<TreatmentPlan>) {}

  async findAll(): Promise<TreatmentPlan[]> {
    return this.planRepository.find();
  }

  async findByPatient(patientId: string): Promise<TreatmentPlan[]> {
    return this.planRepository.find({ where: { patientId } });
  }

  async create(payload: Partial<TreatmentPlan>): Promise<TreatmentPlan> {
    const plan = this.planRepository.create(payload);
    return this.planRepository.save(plan);
  }
}
