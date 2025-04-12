import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from "@nestjs/common"
import { ProductService } from "./product.service"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { User } from "@prisma/client"

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: { currentUser: User },
  ) {
    return this.productService.create(createProductDto, req.currentUser.id)
  }

  @Get()
  findAll(@Request() req: { currentUser: User }) {
    return this.productService.findAll({
      where: { userId: req.currentUser.id },
    })
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id)
  }
}
