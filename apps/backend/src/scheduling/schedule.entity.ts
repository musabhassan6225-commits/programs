import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'schedule_slots' })
export class ScheduleSlot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clinicId: string;

  @Column()
  providerId: string;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column({ default: 'available' })
  status: string;

  @Column({ nullable: true })
  appointmentId: string;

  @Column({ nullable: true })
  slotType: string;
}
