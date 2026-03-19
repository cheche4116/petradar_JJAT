import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class PostgisService implements OnModuleInit {
  private readonly logger = new Logger(PostgisService.name);

  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit(): Promise<void> {
    try {
      await this.dataSource.query('CREATE EXTENSION IF NOT EXISTS postgis;');
      this.logger.log('PostGIS extension verified.');
    } catch (error) {
      this.logger.warn(
        'Could not create PostGIS extension automatically. Ensure postgis is enabled in the database.',
      );
      this.logger.debug(error instanceof Error ? error.message : String(error));
    }
  }
}
