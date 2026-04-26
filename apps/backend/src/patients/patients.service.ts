import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private patientRepository: Repository<Patient>) {}

  async findAll(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async findById(id: string): Promise<Patient | null> {
    return await this.patientRepository.findOne({ where: { id } });
  }

  async create(payload: Partial<Patient>): Promise<Patient> {
    const patient = this.patientRepository.create(payload);
    return this.patientRepository.save(patient);
  }
}
