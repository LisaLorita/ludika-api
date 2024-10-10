import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected.decorator';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const user = req.user as UserEntity;

    if (!user) throw new BadRequestException('User not found');
    if (!validRoles || validRoles.length === 0) return true; //en caso de que no haya roles asignados

    //Verificar si el usuario tiene los roles necesarios
    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }
    //Si no tiene los roles necesarios lanza una excepción
    throw new ForbiddenException(
      `User ${user.name} does not have the necessary roles`,
    );
  }
}
