import { Expose, Transform, Type } from "class-transformer";
import { IsDefined, IsEmail, IsEnum, IsNotEmptyObject, IsString, IsUUID, Length, Matches, ValidateNested } from "class-validator";
import { Anbieterwechsel, Neueinzug, ZaehlerDaten } from "./zaehlerdaten";

export enum Anrede {
  FRAU = 'FRAU', HERR = 'HERR', DIVERS = 'DIVERS'
}

export enum Titel {
  DR = 'DR', PROF = 'PROF', PROF_DR = 'PROF_DR'
}

export class UserDto {

  @Expose()
  @IsDefined()
  @IsUUID()
  addressId: string;

  @Expose()
  @IsDefined()
  @IsEnum(Anrede)
  anrede: Anrede;

  @Expose()
  @IsEnum(Titel)
  titel: Titel;

  @Expose()
  @IsDefined()
  vorname: string;

  @Expose()
  @IsDefined()
  nachname: string;

  @Expose()
  @IsDefined()
  @Matches(/[0-9]{2}\.[0-9]{2}\.[0-9]{4}/)
  geburtsdatum: string

  @Expose()
  @IsDefined()
  @Length(6, 20)
  telefonnummer: string;

  @Expose()
  @IsDefined()
  @IsEmail()
  email: string;

  @Expose()
  @IsDefined()
  @Length(5, 40)
  @Transform((password?: string) => password?.trim(), { toClassOnly: true })
  @IsString()
  password: string;

  @Expose()
  @IsDefined()
  @Length(22, 22)
  @IsString()
  @Transform((iban?: string) => iban?.trim())
  iban: string;

  @Expose()
  @IsDefined()
  @IsString()
  kontoinhaber: string;

  @Expose()
  rabattCode: string;

  @Expose()
  empfehlung: string;


  @Expose()
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ZaehlerDaten, {
    discriminator: {
      property: 'type',
      subTypes: [
        {value: Anbieterwechsel, name: 'ANBIETERWECHSEL'},
        {value: Neueinzug, name: 'NEUEINZUG'}
      ]
    },
    keepDiscriminatorProperty: true
  })
  zaehlerdaten: Anbieterwechsel | Neueinzug;

}


