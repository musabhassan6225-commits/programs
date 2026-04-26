import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clinics' })
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  timezone: string;
}
