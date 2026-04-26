import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'treatment_plans' })
export class TreatmentPlan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column()
  providerId: string;

  @Column({ type: 'json', nullable: true })
  diagnoses: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  plannedProcedures: Record<string, any>;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  estimatedCost: number;

  @Column({ default: 'draft' })
  status: string;

  @Column({ nullable: true })
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;
}
