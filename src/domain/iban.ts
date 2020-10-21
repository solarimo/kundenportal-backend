import { Expose } from "class-transformer";
import { IsDefined, IsIBAN, IsString, Matches } from "class-validator";

export class IbanDto {

  @Expose()
  @IsDefined()
  @Matches(/[A-Z]{2}[0-9].+/)
  iban: string;

}

export class OpenIbanResponseDto {

  valid: boolean;
  bankData: {
    bic: string;
  }
}

export class IbanResponseDto {
  valid: boolean;
  bic?: string;
}