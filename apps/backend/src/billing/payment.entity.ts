import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  invoiceId: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({ default: 'card' })
  method: string;

  @Column({ nullable: true })
  processedAt: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;
}
