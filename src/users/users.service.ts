import { Injectable } from "@nestjs/common"
import { Prisma, User } from "@prisma/client"
import { PrismaService } from "../prisma.service"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data })
  }

  async update({ where, data }: Prisma.UserUpdateArgs) {
    return this.prisma.user.update({
      where,
      data,
    })
  }

  async findOne({ where, include = {} }: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique({
      where,
      include,
    })
  }

  async remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    })
  }
}
