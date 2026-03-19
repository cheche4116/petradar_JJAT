import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LostPet } from './entities/lost-pet.entity';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetsRepository: Repository<LostPet>,
  ) {}

  async create(createLostPetDto: CreateLostPetDto): Promise<LostPet> {
    const entity = this.lostPetsRepository.create({
      ...createLostPetDto,
      lost_date: new Date(createLostPetDto.lost_date),
      location: {
        type: 'Point',
        coordinates: [createLostPetDto.location.lng, createLostPetDto.location.lat],
      },
      is_active: createLostPetDto.is_active ?? true,
      photo_url: createLostPetDto.photo_url ?? null,
    });

    return this.lostPetsRepository.save(entity);
  }
}