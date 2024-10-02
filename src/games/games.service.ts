import { Injectable } from '@nestjs/common';
import { Game } from './entities/game.entity';
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
    if (!game) throw new Error('Game not found');
    return game;
  }

  create(dto: CreateGameDto) {
    return this.gamesRepository.save(dto);
  }
}
