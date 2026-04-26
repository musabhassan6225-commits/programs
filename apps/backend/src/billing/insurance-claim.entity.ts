import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'insurance_claims' })
export class InsuranceClaim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column({ nullable: true })
  invoiceId: string;

  @Column()
  insurerName: string;

  @Column({ nullable: true })
  policyNumber: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  amountClaimed: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  amountPaid: number;

  @Column({ default: 'submitted' })
  status: string;

  @Column({ nullable: true })
  submittedAt: string;

  @Column({ nullable: true })
  processedAt: string;
}
