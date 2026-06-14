import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import type { ContactPayload } from '@portfolio/types';

export class ContactDto implements ContactPayload {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsEmail()
  @MaxLength(160)
  email!: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  subject?: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  message!: string;

  /** Honeypot: bots fill this; real users never see it. */
  @IsOptional()
  @IsString()
  company?: string;
}
