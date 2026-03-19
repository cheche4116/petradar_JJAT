import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PointDto } from '../../common/dto/point.dto';

export class CreateFoundPetDto {
  @IsString()
  @IsNotEmpty()
  species: string;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUrl()
  photo_url?: string;

  @IsString()
  @IsNotEmpty()
  finder_name: string;

  @IsEmail()
  finder_email: string;

  @IsString()
  @IsNotEmpty()
  finder_phone: string;

  @ValidateNested()
  @Type(() => PointDto)
  location: PointDto;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString()
  found_date: string;
}