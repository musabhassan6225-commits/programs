import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsOptional()
  @IsString()
  clinicId?: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  notes?: Record<string, any>;
}
