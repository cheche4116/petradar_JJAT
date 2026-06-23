import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialPetRadarSchema1710000000000 implements MigrationInterface {
  name = 'InitialPetRadarSchema1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS lost_pets (
        id SERIAL PRIMARY KEY,
        name varchar(255) NOT NULL,
        species varchar(100) NOT NULL,
        breed varchar(100) NOT NULL,
        color varchar(100) NOT NULL,
        size varchar(50) NOT NULL,
        description text NOT NULL,
        photo_url varchar(500),
        owner_name varchar(255) NOT NULL,
        owner_email varchar(255) NOT NULL,
        owner_phone varchar(50) NOT NULL,
        location jsonb NOT NULL,
        address varchar(255) NOT NULL,
        lost_date timestamp NOT NULL,
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS found_pets (
        id SERIAL PRIMARY KEY,
        species varchar(100) NOT NULL,
        breed varchar(100),
        color varchar(100) NOT NULL,
        size varchar(50) NOT NULL,
        description text NOT NULL,
        photo_url varchar(500),
        finder_name varchar(255) NOT NULL,
        finder_email varchar(255) NOT NULL,
        finder_phone varchar(50) NOT NULL,
        location jsonb NOT NULL,
        address varchar(255) NOT NULL,
        found_date timestamp NOT NULL,
        created_at timestamp NOT NULL DEFAULT now(),
        updated_at timestamp NOT NULL DEFAULT now()
      )
    `);

    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_lost_pets_location ON lost_pets USING gin(location)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_found_pets_location ON found_pets USING gin(location)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS found_pets');
    await queryRunner.query('DROP TABLE IF EXISTS lost_pets');
  }
}
