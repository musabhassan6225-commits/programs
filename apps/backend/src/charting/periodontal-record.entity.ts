import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'periodontal_records' })
export class PeriodontalRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column({ type: 'json', nullable: true })
  measurements: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  notes: Record<string, any>;

  @Column({ nullable: true })
  recordedAt: string;
}
