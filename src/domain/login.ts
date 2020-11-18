import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsString } from "class-validator";

export class LoginCredentialsDto {

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsDefined()
  @IsString()
  password: string;


}