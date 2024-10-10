import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';

export const RawHeaders = createParamDecorator(
  (_data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders;
  },
);
