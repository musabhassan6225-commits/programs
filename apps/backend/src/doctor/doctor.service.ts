import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorProfile } from './doctor-profile.entity';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(DoctorProfile) private doctorRepository: Repository<DoctorProfile>) {}

  async findAll(): Promise<DoctorProfile[]> {
    return this.doctorRepository.find();
  }

  async findById(id: string): Promise<DoctorProfile | null> {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async create(payload: Partial<DoctorProfile>): Promise<DoctorProfile> {
    const profile = this.doctorRepository.create(payload);
    return this.doctorRepository.save(profile);
  }
}
