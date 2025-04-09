import { Module, ValidationPipe } from "@nestjs/common"
import { APP_GUARD, APP_PIPE } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"
import { PrismaService } from "../prisma.service"
import { UsersService } from "../users/users.service"
import { AuthController } from "./auth.controller"
import { AuthGuard } from "./auth.guard"
import { AuthService } from "./auth.service"
import { secret } from "./constants/jwt.constant"

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    PrismaService,
    { provide: APP_PIPE, useClass: ValidationPipe },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AuthModule {}
