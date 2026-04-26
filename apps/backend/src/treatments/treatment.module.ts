import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';
import { TreatmentPlan } from './treatment-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentPlan])],
  controllers: [TreatmentController],
  providers: [TreatmentService],
  exports: [TreatmentService],
})
export class TreatmentModule {}
