import { IsDefined, IsNumber, IsUUID } from "class-validator";


export class CalculateRequestDto {

  @IsDefined()
  @IsNumber()
  stromverbrauch: number;

  @IsDefined()
  @IsUUID()
  addressId: string;
  
}