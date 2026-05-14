import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { LostPet } from './entities/lost-pet.entity';
import { CreateLostPetDto } from './dto/create-lost-pet.dto';

@Injectable()
export class LostPetsService {
  constructor(
    @InjectRepository(LostPet)
    private readonly lostPetsRepository: Repository<LostPet>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async findAll(): Promise<LostPet[]> {
    const cacheKey = 'lost_pets_all';
    
    // Intentar obtener del caché
    const cachedData = await this.cacheManager.get<LostPet[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    // Si no está en caché, obtener de la base de datos
    const data = await this.lostPetsRepository.find({
      where: { is_active: true },
      order: { lost_date: 'DESC' },
    });

    // Guardar en caché
    await this.cacheManager.set(cacheKey, data);

    return data;
  }

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

    const result = await this.lostPetsRepository.save(entity);

    // Invalidar caché después de crear un nuevo registro
    await this.cacheManager.del('lost_pets_all');

    return result;
  }
}