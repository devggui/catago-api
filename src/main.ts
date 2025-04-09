import { ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import * as cookieParser from "cookie-parser"
import { AppModule } from "./app.module"
import { setupSwagger } from "./docs/swagger.config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  setupSwagger(app)

  await app.listen(process.env.APP_PORT || 5000)
}

bootstrap()
