import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Appointment | null> {
    return this.appointmentsService.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentsService.create(payload);
  }
}
