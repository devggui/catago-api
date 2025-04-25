import { HttpException, HttpStatus } from "@nestjs/common"

export class CatalogNotFoundException extends HttpException {
  constructor() {
    super("Catalog not found", HttpStatus.NOT_FOUND)
  }
}
