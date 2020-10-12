import { Expose, Type } from "class-transformer";
import { IsDefined, IsEmail, IsEnum, IsNotEmptyObject, IsUUID, Length, Matches, ValidateNested } from "class-validator";
import { IsInstanceOf } from '../utils/validators';
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
  // @IsInstanceOf(Anbieterwechsel, Neueinzug)
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


