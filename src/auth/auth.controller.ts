import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  // SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { UserEntity } from 'src/entities/user.entity';
// import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorators/role-protected.decorator';
import { ValidRoles } from 'src/users/enums/valid-roles. enum';
import { Auth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @Req() request: Express.Request,
  //   @GetUser() user: UserEntity,
  //   @GetUser('email') userEmail: string,

  //   // @RawHeaders() rawHeaders: string[],
  // ) {
  //   return {
  //     ok: true,
  //     message: 'This is a private route',
  //     user,
  //     userEmail,
  //     // rawHeaders,
  //   };
  // }
//   // @SetMetadata('roles', ['admin', 'superadmin']) // Asignar roles a la ruta
//   @Get('private2')
//   @RoleProtected(ValidRoles.SUPERUSER, ValidRoles.USER)
//   @UseGuards(AuthGuard(), UserRoleGuard) //Autorización + autenticación
//   privateRoute2(@GetUser() user: UserEntity) {
//     return {
//       ok: true,
//       user,
//     };
//   }

//   @Get('private3')
//   @Auth(ValidRoles.USER)
//   privateRoute3(@GetUser() user: UserEntity) {
//     return {
//       ok: true,
//       user,
//     };
//   }
}
