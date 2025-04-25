import { Injectable } from "@nestjs/common"
import { CreateProductDto } from "./dto/create-product.dto"
import { UpdateProductDto } from "./dto/update-product.dto"
import { PrismaService } from "src/prisma.service"
import { Product, Prisma } from "@prisma/client"

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProductDto: CreateProductDto, userId: string): Promise<Product> {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        userId,
      },
    })
  }

  findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ProductWhereUniqueInput
    where?: Prisma.ProductWhereInput
    orderBy?: Prisma.ProductOrderByWithRelationInput
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({ where: { id } })
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    })
  }

  remove(id: string) {
    return this.prisma.product.delete({ where: { id } })
  }
}
