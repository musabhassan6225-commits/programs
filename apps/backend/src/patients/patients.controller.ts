import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient | null> {
    return this.patientsService.findById(id);
  }

  @Post()
  async create(@Body() payload: CreatePatientDto): Promise<Patient> {
    return this.patientsService.create(payload);
  }
}
