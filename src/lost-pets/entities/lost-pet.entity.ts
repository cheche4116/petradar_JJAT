import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

type GeoPoint = {
  type: 'Point';
  coordinates: [number, number];
};

@Entity('lost_pets')
export class LostPet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  species: string;

  @Column({ type: 'varchar', length: 100 })
  breed: string;

  @Column({ type: 'varchar', length: 100 })
  color: string;

  @Column({ type: 'varchar', length: 50 })
  size: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  photo_url: string | null;

  @Column({ type: 'varchar', length: 255 })
  owner_name: string;

  @Column({ type: 'varchar', length: 255 })
  owner_email: string;

  @Column({ type: 'varchar', length: 50 })
  owner_phone: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: GeoPoint;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'timestamp' })
  lost_date: Date;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}