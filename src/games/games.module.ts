import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from '../entities/game.entity';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([GameEntity])],
  exports: [GamesService],
})
export class GamesModule {}
