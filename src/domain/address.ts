import { Expose } from 'class-transformer';
import { IsDefined, Matches } from 'class-validator';

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

}