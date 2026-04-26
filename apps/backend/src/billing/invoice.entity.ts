import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column({ nullable: true })
  appointmentId: string;

  @Column({ nullable: true })
  clinicId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  totalAmount: number;

  @Column({ type: 'json', nullable: true })
  lineItems: Record<string, any>;

  @Column({ default: 'pending' })
  status: string;

  @Column({ type: 'date', nullable: true })
  issueDate: string;

  @Column({ type: 'date', nullable: true })
  dueDate: string;
}
