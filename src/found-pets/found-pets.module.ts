import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoundPetsController } from './found-pets.controller';
import { FoundPetsService } from './found-pets.service';
import { FoundPet } from './entities/found-pet.entity';
import { LostPet } from '../lost-pets/entities/lost-pet.entity';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([FoundPet, LostPet]), NotificationsModule],
  controllers: [FoundPetsController],
  providers: [FoundPetsService],
})
export class FoundPetsModule {}