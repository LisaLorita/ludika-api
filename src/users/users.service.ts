import {
  // BadRequestException,
  Injectable,
  // InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
  findAll() {
    return this.usersRepository.find();
  }
  async findById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  // async create(createUserDto: CreateUserDto) {
  //   try {
  //     const { password, ...userData } = createUserDto;
  //     const user = this.usersRepository.create({
  //       ...userData,
  //       password: bcrypt.hashSync(password, 10),
  //     });
  //     await this.usersRepository.save(user);
  //     delete user.password; //no retorna pssw
  //     return user;
  //     //TODO JWT
  //   } catch (error) {
  //     this.handleDBErrors(error);
  //   }
  // }
  async update(id: string, dto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id: id,
      ...dto,
    });
    return this.usersRepository.save(user);
  }
  async remove(id: string) {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }
}
