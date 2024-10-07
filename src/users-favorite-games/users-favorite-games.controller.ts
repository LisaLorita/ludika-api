import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersFavoriteGamesService } from './users-favorite-games.service';
import { CreateUserFavoriteGameDto } from './dto/create-user-favorite-game.dto';
import { FindUserFavoriteGamesDto } from './dto/find-user-favorite-games.dto';
import { DeleteUserFavoriteGameDto } from './dto/delete-user-favorite-game.dto';

@Controller('users-favorite-games')
export class UsersFavoriteGamesController {
  constructor(private readonly service: UsersFavoriteGamesService) {}

  @Get(':userId')
  findFavorites(@Param() request: FindUserFavoriteGamesDto) {
    return this.service.findUserFavorites(request);
  }

  @Post()
  addFavorite(@Body() request: CreateUserFavoriteGameDto) {
    return this.service.addFavorite(request);
  }

  @Delete(':userFavoriteGameId')
  deleteFavorite(@Param() request: DeleteUserFavoriteGameDto) {
    return this.service.deleteFavorite(request);
  }
}
