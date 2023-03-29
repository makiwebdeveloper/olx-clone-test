import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwt: JwtService, private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException('User is not authorized');

      const user = this.jwt.verify(token);
      req.user = user;

      return user.roles.some((role) => requiredRoles.includes(role));
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN);
    }
  }
}
