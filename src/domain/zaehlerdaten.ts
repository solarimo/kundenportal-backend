import { Expose, Type } from "class-transformer";
import { Equals, IsBoolean, IsDate, IsDefined, IsString } from "class-validator";

export abstract class ZaehlerDaten {
  abstract type: 'NEUEINZUG' | 'ANBIETERWECHSEL';
  abstract zaehlernummer: string;
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
  @IsBoolean()
  bereitsGekuendigt: boolean;

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