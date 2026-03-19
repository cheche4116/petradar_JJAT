import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoundPet } from './entities/found-pet.entity';
import { CreateFoundPetDto } from './dto/create-found-pet.dto';
import { LostPet } from '../lost-pets/entities/lost-pet.entity';
import { MailService } from '../notifications/mail.service';

type LostPetMatch = LostPet & {
  distance: number;
  lost_lat: number;
  lost_lng: number;
};

@Injectable()
export class FoundPetsService {
  private readonly logger = new Logger(FoundPetsService.name);

  constructor(
    @InjectRepository(FoundPet)
    private readonly foundPetsRepository: Repository<FoundPet>,
    @InjectRepository(LostPet)
    private readonly lostPetsRepository: Repository<LostPet>,
    private readonly mailService: MailService,
  ) {}

  async create(createFoundPetDto: CreateFoundPetDto) {
    const foundPet = await this.foundPetsRepository.save(
      this.foundPetsRepository.create({
        ...createFoundPetDto,
        found_date: new Date(createFoundPetDto.found_date),
        location: {
          type: 'Point',
          coordinates: [createFoundPetDto.location.lng, createFoundPetDto.location.lat],
        },
        breed: createFoundPetDto.breed ?? null,
        photo_url: createFoundPetDto.photo_url ?? null,
      }),
    );

    const matches = await this.findLostPetsWithin500Meters(
      createFoundPetDto.location.lng,
      createFoundPetDto.location.lat,
    );

    await Promise.all(
      matches.map(async (match) => {
        try {
          await this.mailService.sendFoundMatchEmail({
            lostPet: match,
            foundPet,
            distanceMeters: Number(match.distance),
            lostCoords: {
              lat: Number(match.lost_lat),
              lng: Number(match.lost_lng),
            },
            foundCoords: createFoundPetDto.location,
          });
        } catch (error) {
          this.logger.error(
            `Error sending notification for lost pet ${match.id}`,
            error instanceof Error ? error.stack : String(error),
          );
        }
      }),
    );

    return {
      foundPet,
      matchesFound: matches.length,
      matchedLostPets: matches.map((match) => ({
        id: match.id,
        name: match.name,
        owner_email: match.owner_email,
        distance: Number(match.distance),
      })),
    };
  }

  private async findLostPetsWithin500Meters(
    lng: number,
    lat: number,
  ): Promise<LostPetMatch[]> {
    const query = `
      SELECT
        lp.*,
        ST_Distance(
          lp.location::geography,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
        ) AS distance,
        ST_Y(lp.location::geometry) AS lost_lat,
        ST_X(lp.location::geometry) AS lost_lng
      FROM lost_pets lp
      WHERE lp.is_active = true
        AND ST_DWithin(
          lp.location::geography,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography,
          500
        )
      ORDER BY distance ASC
    `;

    return this.lostPetsRepository.query(query, [lng, lat]);
  }
}