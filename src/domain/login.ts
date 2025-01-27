import { Expose } from "class-transformer";
import { IsDefined, IsEmail, IsString, IsUUID } from "class-validator";

export class LoginCredentialsDto {

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsDefined()
  @IsString()
  password: string;


}

export class RefreshTokenDto {

  @Expose()
  @IsUUID()
  refreshToken: string;
}