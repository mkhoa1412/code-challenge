import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
