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

@Entity('found_pets')
export class FoundPet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  species: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  breed: string | null;

  @Column({ type: 'varchar', length: 100 })
  color: string;

  @Column({ type: 'varchar', length: 50 })
  size: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  photo_url: string | null;

  @Column({ type: 'varchar', length: 255 })
  finder_name: string;

  @Column({ type: 'varchar', length: 255 })
  finder_email: string;

  @Column({ type: 'varchar', length: 50 })
  finder_phone: string;

  @Column({
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  location: GeoPoint;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'timestamp' })
  found_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}