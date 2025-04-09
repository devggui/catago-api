import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
