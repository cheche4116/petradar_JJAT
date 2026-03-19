import {
  IsBoolean,
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

export class CreateLostPetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsNotEmpty()
  breed: string;

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
  owner_name: string;

  @IsEmail()
  owner_email: string;

  @IsString()
  @IsNotEmpty()
  owner_phone: string;

  @ValidateNested()
  @Type(() => PointDto)
  location: PointDto;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString()
  lost_date: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}