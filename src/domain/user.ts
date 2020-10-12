import { Type } from "class-transformer";
import { Equals, IsBoolean, IsDate, IsDefined, IsEmail, IsEnum, IsInstance, IsUUID, Length, Matches, ValidateNested } from "class-validator";

export enum Anrede {
  FRAU = 'FRAU', HERR = 'HERR', DIVERS = 'DIVERS'
}

export enum Titel {
  DR = 'DR', PROF = 'PROF', PROF_DR = 'PROF_DR'
}

export enum Reason {
  ANBIETERWECHSEL = 'ANBIETERWECHSEL',
  NEUEINZUG = 'NEUEINZUG'
}


export abstract class ZaehlerDaten {
  abstract __type: 'NEUEINZUG' | 'ANBIETERWECHSEL';
  abstract zaehlernummer: string;
  abstract reason: Reason;
}

export class Anbieterwechsel extends ZaehlerDaten {

  @IsDefined()
  @Equals('ANBIETERWECHSEL')
  __type: 'ANBIETERWECHSEL';

  @IsDefined()
  @IsEnum(Reason)
  reason: Reason;

  @IsDefined()
  zaehlernummer: string;

  @IsDefined()
  bisherigerAnbieter: string;

  @IsDefined()
  @IsBoolean()
  bereitsGekuendigt: boolean;

  @IsDate()
  @IsDefined()
  @Type(() => Date)
  vertragslaufzeitBis: Date;
}

export class Neueinzug extends ZaehlerDaten {

  @Equals('NEUEINZUG')
  @IsDefined()
  __type: 'NEUEINZUG';

  @IsDefined()
  @IsEnum(Reason)
  reason: Reason;

  zaehlernummer: string;

  @Type(() => Date)
  einzugsDatum: Date;

}

export class UserDto {

  @IsDefined()
  @IsUUID()
  addressId: string;

  @IsDefined()
  @IsEnum(Anrede)
  anrede: Anrede;

  @IsEnum(Titel)
  titel: Titel;

  @IsDefined()
  vorname: string;

  @IsDefined()
  nachname: string;

  @IsDefined()
  @Matches(/[0-9]{2}\.[0-9]{2}\.[0-9]{4}/)
  geburtsdatum: string

  @IsDefined()
  @Length(6, 20)
  telefonnummer: string;

  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => ZaehlerDaten, {
    discriminator: {
      property: '__type',
      subTypes: [
        {value: Anbieterwechsel, name: 'ANBIETERWECHSEL'},
        {value: Neueinzug, name: 'NEUEINZUG'}
      ]
    },
    keepDiscriminatorProperty: true
  })
  zaehlerdaten: Anbieterwechsel | Neueinzug;

}


