import { Controller, Delete, Get, Param } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { User } from "@prisma/client"
import { UsersService } from "./users.service"

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<User> {
    return this.usersService.remove({ id })
  }
}
