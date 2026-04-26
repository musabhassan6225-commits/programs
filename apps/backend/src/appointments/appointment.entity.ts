import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'appointments' })
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column()
  providerId: string;

  @Column({ nullable: true })
  clinicId: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  type: string;

  @Column({ default: 'scheduled' })
  status: string;

  @Column({ type: 'json', nullable: true })
  notes: Record<string, any>;
}
