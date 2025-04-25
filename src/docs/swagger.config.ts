import { type INestApplication } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle("CataGo API")
    .setDescription("@devggui CataGo API")
    .setVersion("1.0")
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      docExpansion: "none",
    },
  })
}
