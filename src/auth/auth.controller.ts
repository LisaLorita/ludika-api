import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { GetUser } from './decorators/get-user.decorator';
import { UserEntity } from 'src/entities/user.entity';
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

  //Verifica si el usuario está autenticado
  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: UserEntity) {
    return this.authService.checkAuthStatus(user);
  }
}
