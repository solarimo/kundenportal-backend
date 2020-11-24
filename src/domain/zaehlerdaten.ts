import { Expose, Type } from "class-transformer";
import { Equals, IsDate, IsDefined, IsEnum, IsString } from "class-validator";

export abstract class ZaehlerDaten {
  abstract type: 'NEUEINZUG' | 'ANBIETERWECHSEL';
  abstract zaehlernummer: string;
}

export enum Kuendigung {
  BEREITS_GEKUENDIGT = 'BEREITS_GEKUENDIGT',
  KUENDIGUNG_UEBERNEHMEN = 'KUENDIGUNG_UEBERNEHMEN'
}

export class Anbieterwechsel extends ZaehlerDaten {

  @Expose()
  @IsDefined()
  @Equals('ANBIETERWECHSEL')
  type: 'ANBIETERWECHSEL';

  @Expose()
  @IsDefined()
  zaehlernummer: string;

  @Expose()
  @IsDefined()
  @IsString()
  bisherigerAnbieter: string;

  @Expose()
  @IsDefined()
  @IsEnum(Kuendigung)
  bereitsGekuendigt: Kuendigung;

  @Expose()
  @IsDate()
  @IsDefined()
  @Type(() => Date)
  vertragslaufzeitBis: Date;
}

export class Neueinzug extends ZaehlerDaten {

  @Expose()
  @Equals('NEUEINZUG')
  @IsDefined()
  type: 'NEUEINZUG';

  @Expose()
  zaehlernummer: string;

  @Expose()
  @IsDefined()
  @IsDate()
  @Type(() => Date)
  einzugsDatum: Date;

}