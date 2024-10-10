import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from '../entities/game.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [GamesService],
  controllers: [GamesController],
  imports: [TypeOrmModule.forFeature([GameEntity]), AuthModule],
  exports: [GamesService],
})
export class GamesModule {}
