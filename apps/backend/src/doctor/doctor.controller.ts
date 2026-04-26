import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DoctorProfile } from './doctor-profile.entity';
import { DoctorService } from './doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async findAll(): Promise<DoctorProfile[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<DoctorProfile | null> {
    return this.doctorService.findById(id);
  }

  @Post()
  async create(@Body() payload: Partial<DoctorProfile>): Promise<DoctorProfile> {
    return this.doctorService.create(payload);
  }
}
