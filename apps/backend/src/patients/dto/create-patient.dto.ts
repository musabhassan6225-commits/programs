import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  insuranceProvider?: string;

  @IsOptional()
  @IsString()
  insuranceNumber?: string;

  @IsOptional()
  medicalHistory?: Record<string, any>;

  @IsOptional()
  dentalHistory?: Record<string, any>;

  @IsOptional()
  clinicalFindings?: Record<string, any>;
}
