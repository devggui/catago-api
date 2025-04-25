import { ApiProperty } from "@nestjs/swagger"
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
} from "class-validator"

export class CreateProductDto {
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
  @IsNumber()
  price: number

  @ApiProperty()
  @IsString()
  @IsOptional()
  category?: string

  @ApiProperty()
  @IsBoolean()
  isActive: boolean

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isHighlighted?: boolean

  @ApiProperty()
  @IsString()
  @IsOptional()
  imageUrl?: string
}
