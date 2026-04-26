import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UploadImagingDto {
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsOptional()
  @IsString()
  description?: string;
}
