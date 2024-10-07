import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavoriteGameEntity } from 'src/entities/user-favorite-game.entity';
import { GamesModule } from 'src/games/games.module';
import { UsersModule } from 'src/users/users.module';
import { UsersFavoriteGamesService } from './users-favorite-games.service';
import { UsersFavoriteGamesController } from './users-favorite-games.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserFavoriteGameEntity]),
    UsersModule,
    GamesModule,
  ],
  controllers: [UsersFavoriteGamesController],
  providers: [UsersFavoriteGamesService],
  exports: [UsersFavoriteGamesService],
})
export class UsersFavoriteGamesModule {}
