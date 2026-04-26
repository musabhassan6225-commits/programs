import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'doctor_profiles' })
export class DoctorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  biography: string;

  @Column('simple-array', { nullable: true })
  availabilities: string[];

  @Column({ type: 'json', nullable: true })
  performanceMetrics: Record<string, any>;
}
