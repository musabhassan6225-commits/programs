import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { Clinic } from './clinic.entity';

@Controller('clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  async findAll(): Promise<Clinic[]> {
    return this.clinicService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Clinic | null> {
    return this.clinicService.findById(id);
  }

  @Post()
  async create(@Body() payload: Partial<Clinic>): Promise<Clinic> {
    return this.clinicService.create(payload);
  }
}
