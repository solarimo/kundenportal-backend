import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, Matches } from 'class-validator';

export class AddressDto {

  @IsDefined()
  @Expose()
  strasse: string;

  @IsDefined()
  @Expose()
  hausnummer: string;

  @IsDefined()
  @Expose()
  @Matches(/[0-9]{5}/)
  postleitzahl: string;

  @IsDefined()
  @Expose()
  stadt: string;

  constructor(
    strasse: string,
    hausnummer: string,
    postleitzahl: string,
    stadt: string
  ) {
    this.strasse = strasse;
    this.hausnummer = hausnummer;
    this.postleitzahl = postleitzahl;
    this.stadt = stadt;
  }
}