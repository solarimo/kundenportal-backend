import { IsDefined, IsNumber, IsUUID } from "class-validator";


export class CalculateRequest {

  @IsDefined()
  @IsNumber()
  stromverbrauch: number;

  @IsDefined()
  @IsUUID()
  addressId: string;
  
}