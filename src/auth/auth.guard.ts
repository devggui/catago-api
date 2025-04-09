import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { UsersService } from "../users/users.service"
import { secret } from "./constants/jwt.constant"
import { IS_PUBLIC_KEY } from "./decorators/public.decorator"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromCookies(request)

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret,
      })

      const currentUser = await this.usersService.findOne({
        where: {
          email: payload.username,
        },
        include: {
          catalogs: true,
          products: true,
        },
      })

      request["currentUser"] = currentUser
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    return request?.cookies?.auth ?? undefined
  }
}
