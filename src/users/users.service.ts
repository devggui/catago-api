import { Injectable } from "@nestjs/common"
import { Prisma, User } from "@prisma/client"
import { PrismaService } from "../prisma.service"

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany()
  }

  create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data })
  }

  update({ where, data }: Prisma.UserUpdateArgs) {
    return this.prisma.user.update({
      where,
      data,
    })
  }

  findOne({ where, include = {} }: Prisma.UserFindUniqueArgs) {
    return this.prisma.user.findUnique({
      where,
      include,
    })
  }

  finishUserOnboarding(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.update({
      where,
      data: {
        onboarded: true,
      },
    })
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({
      where,
    })
  }
}
