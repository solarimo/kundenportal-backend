import { Expose } from "class-transformer";
import { IsDefined, IsNumber, IsUUID } from "class-validator";


export class CalculateRequestDto {

  @Expose()
  @IsDefined()
  @IsNumber()
  stromverbrauch: number;

  @Expose()
  @IsDefined()
  @IsUUID()
  addressId: string;
  
}