import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  insuranceProvider: string;

  @Column({ nullable: true })
  insuranceNumber: string;

  @Column({ type: 'json', nullable: true })
  medicalHistory: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  dentalHistory: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  clinicalFindings: Record<string, any>;
}
