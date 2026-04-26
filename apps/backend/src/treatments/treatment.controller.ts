import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentPlan } from './treatment-plan.entity';

@Controller('treatment-plans')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {}

  @Get()
  async all(): Promise<TreatmentPlan[]> {
    return this.treatmentService.findAll();
  }

  @Get('patient/:patientId')
  async byPatient(@Param('patientId') patientId: string): Promise<TreatmentPlan[]> {
    return this.treatmentService.findByPatient(patientId);
  }

  @Post()
  async create(@Body() payload: Partial<TreatmentPlan>): Promise<TreatmentPlan> {
    return this.treatmentService.create(payload);
  }
}
