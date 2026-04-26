import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagingAsset } from './image.entity';

@Injectable()
export class ImagingService {
  constructor(@InjectRepository(ImagingAsset) private imagingRepository: Repository<ImagingAsset>) {}

  async findAll(patientId?: string) {
    return this.imagingRepository.find({ where: patientId ? { patientId } : {} });
  }

  async create(payload: Partial<ImagingAsset>) {
    const asset = this.imagingRepository.create(payload);
    return this.imagingRepository.save(asset);
  }
}
