import { Injectable, NotFoundException } from '@nestjs/common';
import { GameEntity } from '../entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
//import { isUUID } from 'class-validator';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GameEntity)
    private gamesRepository: Repository<GameEntity>,
  ) {}

  findAll() {
    return this.gamesRepository.find();
  }
  async findById(id: string) {
    const game = await this.gamesRepository.findOne({ where: { id } });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async findByName(name: string): Promise<GameEntity[]> {
    const games = await this.gamesRepository.find({
      where: { name: Like(`%${name.toUpperCase()}%`) },
    });
    return games;
  }

  async create(dto: CreateGameDto) {
    dto.name = dto.name.toUpperCase();
    return this.gamesRepository.save(dto);
  }

  async update(id: string, dto: CreateGameDto) {
    dto.name = dto.name.toUpperCase();
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
