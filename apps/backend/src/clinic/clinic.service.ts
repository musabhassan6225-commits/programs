import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clinic } from './clinic.entity';

@Injectable()
export class ClinicService {
  constructor(@InjectRepository(Clinic) private clinicRepository: Repository<Clinic>) {}

  async findAll(): Promise<Clinic[]> {
    return this.clinicRepository.find();
  }

  async findById(id: string): Promise<Clinic | null> {
    return this.clinicRepository.findOne({ where: { id } });
  }

  async create(payload: Partial<Clinic>): Promise<Clinic> {
    const clinic = this.clinicRepository.create(payload);
    return this.clinicRepository.save(clinic);
  }
}
