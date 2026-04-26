import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'imaging_assets' })
export class ImagingAsset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column({ nullable: true })
  appointmentId: string;

  @Column({ default: 'x-ray' })
  type: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  fileName: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  uploadedAt: string;
}
