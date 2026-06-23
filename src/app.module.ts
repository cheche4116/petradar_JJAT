import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { FoundPetsModule } from './found-pets/found-pets.module';
import { AppInsightsService } from './monitoring/app-insights.service';
import { redisStore } from 'cache-manager-redis-store';
import { InitialPetRadarSchema1710000000000 } from './database/migrations/InitialPetRadarSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService): Record<string, unknown> => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const ttl = configService.get<number>('CACHE_TTL', 600);

        if (!redisHost) {
          return { ttl };
        }

        return {
          store: redisStore,
          socket: {
            host: redisHost,
            port: configService.get<number>('REDIS_PORT', 6379),
          },
          ttl,
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>('DATABASE_URL');
        const useSsl = configService.get<string>('DB_SSL', 'false') === 'true';

        return {
          type: 'postgres',
          ...(databaseUrl
            ? { url: databaseUrl }
            : {
                host: configService.get<string>('DB_HOST', 'localhost'),
                port: configService.get<number>('DB_PORT', 5432),
                username: configService.get<string>('DB_USERNAME', 'postgres'),
                password: configService.get<string>('DB_PASSWORD', 'postgres'),
                database: configService.get<string>('DB_NAME', 'petradar'),
              }),
          autoLoadEntities: true,
          synchronize: configService.get<string>('DB_SYNCHRONIZE', 'true') === 'true',
          migrations: [InitialPetRadarSchema1710000000000],
          migrationsRun: configService.get<string>('DB_MIGRATIONS_RUN', 'false') === 'true',
          ssl: useSsl ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    LostPetsModule,
    FoundPetsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppInsightsService],
})
export class AppModule {}
