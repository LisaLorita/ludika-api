import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Game } from 'src/entities/game.entity';
import { AddFavoriteDto } from './dto/add-favorite.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}
  findAll() {
    return this.usersRepository.find();
  }
  async findById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  async create(dto: CreateUserDto) {
    return this.usersRepository.save(dto);
  }
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

  //Favorites list
  async getUserFavorites(userId: string): Promise<Game[]> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['games'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.games;
  }

  //add favorite
  async addFavorite(userId: string, dto: AddFavoriteDto): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const game = await this.gamesRepository.findOne({
      where: { id: dto.gameId },
    });
    if (!game) {
      throw new NotFoundException('Game not found');
    }
    user.games.push(game);
    return this.usersRepository.save(user);
  }
}
