import { Injectable, NotFoundException } from '@nestjs/common';
import { Game } from '../entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: Repository<Game>,
  ) {}

  findAll() {
    return this.gamesRepository.find();
  }
  async findById(id: string) {
    const game = await this.gamesRepository.findOne({ where: { id } });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async create(dto: CreateGameDto) {
    return this.gamesRepository.save(dto);
  }

  async update(id: string, dto: CreateGameDto) {
    const game = await this.gamesRepository.preload({
      id: id,
      ...dto,
    });
    return this.gamesRepository.save(game);
  }

  async remove(id: string) {
    const game = await this.findById(id);
    await this.gamesRepository.remove(game);
  }
}
