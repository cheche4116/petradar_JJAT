import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { LostPet } from '../lost-pets/entities/lost-pet.entity';
import { FoundPet } from '../found-pets/entities/found-pet.entity';

type Coordinates = {
  lat: number;
  lng: number;
};

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendFoundMatchEmail(params: {
    lostPet: LostPet;
    foundPet: FoundPet;
    lostCoords: Coordinates;
    foundCoords: Coordinates;
    distanceMeters: number;
  }): Promise<void> {
    const {
      lostPet,
      foundPet,
      lostCoords,
      foundCoords,
      distanceMeters,
    } = params;

    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: this.configService.get<string>('SMTP_SECURE', 'false') === 'true',
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });

    const genericEmail = this.configService.get<string>('GENERIC_NOTIFICATION_EMAIL');
    const recipients = [lostPet.owner_email, genericEmail]
      .filter((email): email is string => Boolean(email))
      .filter((value, index, arr) => arr.indexOf(value) === index);

    if (recipients.length === 0) {
      this.logger.warn('No recipients configured for notification email.');
      return;
    }

    const from = this.configService.get<string>('SMTP_FROM', 'no-reply@petradar.local');
    const mapboxToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN', '');
    const staticMapUrl = this.buildMapboxStaticMap(
      lostCoords,
      foundCoords,
      mapboxToken,
    );

    await transporter.sendMail({
      from,
      to: recipients.join(','),
      subject: `[PetRadar] Posible coincidencia para ${lostPet.name}`,
      html: `
        <h2>PetRadar - Mascota encontrada cerca de una mascota perdida</h2>
        <p><strong>Distancia aproximada:</strong> ${Math.round(distanceMeters)} metros</p>
        <h3>Mascota encontrada</h3>
        <ul>
          <li><strong>Especie:</strong> ${foundPet.species}</li>
          <li><strong>Raza:</strong> ${foundPet.breed ?? 'No identificada'}</li>
          <li><strong>Color:</strong> ${foundPet.color}</li>
          <li><strong>Descripcion:</strong> ${foundPet.description}</li>
          <li><strong>Direccion:</strong> ${foundPet.address}</li>
        </ul>
        <h3>Contacto de quien encontro</h3>
        <ul>
          <li><strong>Nombre:</strong> ${foundPet.finder_name}</li>
          <li><strong>Email:</strong> ${foundPet.finder_email}</li>
          <li><strong>Telefono:</strong> ${foundPet.finder_phone}</li>
        </ul>
        <h3>Mapa del hallazgo y perdida</h3>
        <p>
          <img src="${staticMapUrl}" alt="Mapa de ubicaciones" style="max-width:100%; border:1px solid #ddd;"/>
        </p>
      `,
    });
  }

  private buildMapboxStaticMap(
    lostCoords: Coordinates,
    foundCoords: Coordinates,
    token: string,
  ): string {
    const lostPin = `pin-s-l+f44(${lostCoords.lng},${lostCoords.lat})`;
    const foundPin = `pin-s-f+285A98(${foundCoords.lng},${foundCoords.lat})`;

    return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${lostPin},${foundPin}/auto/700x400?access_token=${token}`;
  }
}