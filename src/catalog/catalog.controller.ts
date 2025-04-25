import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
} from "@nestjs/common"
import { CatalogService } from "./catalog.service"
import { CreateCatalogDto } from "./dto/create-catalog.dto"
import { UpdateCatalogDto } from "./dto/update-catalog.dto"
import { User } from "@prisma/client"
import { Public } from "src/auth/decorators/public.decorator"

@Controller("catalogs")
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  create(
    @Body() createCatalogDto: CreateCatalogDto,
    @Request() req: { currentUser: User },
  ) {
    return this.catalogService.create(createCatalogDto, req.currentUser.id)
  }

  @Get()
  findAll(@Request() req: { currentUser: User }) {
    return this.catalogService.findAll({
      where: { userId: req.currentUser.id },
    })
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.catalogService.findOne(id)
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(id, updateCatalogDto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.catalogService.remove(id)
  }
}
