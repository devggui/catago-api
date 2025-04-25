import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { CatalogModule } from "./catalog/catalog.module"
import { ProductModule } from "./product/product.module"

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    CatalogModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
