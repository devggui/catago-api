import { HttpException, HttpStatus } from "@nestjs/common"

export class InactiveCatalogException extends HttpException {
  constructor() {
    super("Inactive catalog", HttpStatus.NOT_FOUND)
  }
}
