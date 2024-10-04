import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from '../entities/game.entity';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([Game])],
  exports: [TypeOrmModule],
})
export class GamesModule {}
