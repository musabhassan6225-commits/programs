import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tooth_charts' })
export class ToothChart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column({ type: 'json', nullable: true })
  toothStatus: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  treatmentPlan: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  notes: Record<string, any>;
}
