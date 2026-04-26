import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(Appointment) private appointmentRepository: Repository<Appointment>) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findById(id: string): Promise<Appointment | null> {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  async create(payload: Partial<Appointment>): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(payload);
    return this.appointmentRepository.save(appointment);
  }
}
