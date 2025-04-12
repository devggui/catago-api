import { Injectable } from "@nestjs/common"
import { CreateCatalogDto } from "./dto/create-catalog.dto"
import { UpdateCatalogDto } from "./dto/update-catalog.dto"
import { PrismaService } from "src/prisma.service"
import { Catalog, Prisma } from "@prisma/client"

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCatalogDto: CreateCatalogDto, userId: string): Promise<Catalog> {
    return this.prisma.catalog.create({
      data: {
        ...createCatalogDto,
        userId,
      },
    })
  }

  findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.CatalogWhereUniqueInput
    where?: Prisma.CatalogWhereInput
    orderBy?: Prisma.CatalogOrderByWithRelationInput
  }): Promise<Catalog[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.catalog.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  findOne(id: string) {
    return this.prisma.catalog.findUnique({ where: { id } })
  }

  update(id: string, updateCatalogDto: UpdateCatalogDto) {
    return this.prisma.catalog.update({
      where: { id },
      data: updateCatalogDto,
    })
  }

  remove(id: string) {
    return this.prisma.catalog.delete({ where: { id } })
  }
}
