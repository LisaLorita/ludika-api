import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      createUserDto.email = createUserDto.email.toLowerCase();
      createUserDto.name = createUserDto.name.toUpperCase();
      const { password, ...userData } = createUserDto;
      const user = this.usersRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.usersRepository.save(user);
      delete user.password; //no retorna pssw
      return {
        ...user, //toma todas las propiedades del usuario
        token: this.getJwrToken({ id: user.id }), //genera el token
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const normalizeEmail = email.toLowerCase();
    const user = await this.usersRepository.findOne({
      where: { email: normalizeEmail },
      select: { email: true, password: true, id: true },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return {
      ...user, //toma todas las propiedades del usuario
      token: this.getJwrToken({ id: user.id }), //genera el token
    };
  }
  //Generar JWT
  private getJwrToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  //Errors Handling
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please check server logs');
  }
}
