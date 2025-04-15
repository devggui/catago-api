import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateCatalogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  logo?: string

  @ApiProperty()
  @IsBoolean()
  isActive: boolean
}
