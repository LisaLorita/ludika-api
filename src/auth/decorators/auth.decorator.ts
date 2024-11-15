import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from 'src/users/enums/valid-roles.enum';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';

//Decorador verifica si el usuario está autenticado y si tiene los roles necesarios
export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
  );
}
