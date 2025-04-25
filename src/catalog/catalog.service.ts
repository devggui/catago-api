import { Injectable } from "@nestjs/common"
import { CreateCatalogDto } from "./dto/create-catalog.dto"
import { UpdateCatalogDto } from "./dto/update-catalog.dto"
import { PrismaService } from "src/prisma.service"
import { Catalog, Prisma } from "@prisma/client"
import { InactiveCatalogException } from "./exceptions/inactive-catalog-found.exception"
import { CatalogNotFoundException } from "./exceptions/catalog-not-found.exception"

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCatalogDto: CreateCatalogDto, userId: string): Promise<Catalog> {
    const { productIds, ...catalogData } = createCatalogDto

    return this.prisma.catalog.create({
      data: {
        ...catalogData,
        userId,
        products: {
          connect: productIds && productIds.map((id) => ({ id })),
        },
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
      include: {
        products: true,
      },
    })
  }

  async findOne(id: string) {
    const catalog = await this.prisma.catalog.findUnique({
      where: { slug: id },
      include: {
        products: true,
      },
    })

    if (!catalog) {
      throw new CatalogNotFoundException()
    }

    if (!catalog?.isActive) {
      throw new InactiveCatalogException()
    }

    return catalog
  }

  update(id: string, updateCatalogDto: UpdateCatalogDto) {
    const { productIds, ...rest } = updateCatalogDto

    return this.prisma.catalog.update({
      where: { id },
      data: {
        ...rest,
        products: {
          set: productIds?.map((id) => ({ id })) || [],
        },
      },
      include: {
        products: true,
      },
    })
  }

  remove(id: string) {
    return this.prisma.catalog.delete({ where: { id } })
  }
}
