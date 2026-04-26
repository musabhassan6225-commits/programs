import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../common/constants';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  passwordHash: string;

  @Column('simple-array')
  roles: Role[];

  @Column({ nullable: true })
  clinicId: string;
}
