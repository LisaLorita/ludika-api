import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';

//Decorador que obtiene el usuario de la petición
export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest(); //Obtiene la petición
    const user = req.user; //Obtiene el usuario de la petición

    if (!user)
      throw new InternalServerErrorException('User not found in request');

    return user;
  },
);
