import { IsLatitude, IsLongitude } from 'class-validator';

export class PointDto {
  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}