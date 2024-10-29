import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersFavoriteGamesService } from './users-favorite-games.service';
import { CreateUserFavoriteGameDto } from './dto/create-user-favorite-game.dto';
import { FindUserFavoriteGamesDto } from './dto/find-user-favorite-games.dto';
// import { DeleteUserFavoriteGameDto } from './dto/delete-user-favorite-game.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserEntity } from 'src/entities/user.entity';

@Controller('favorites')
@Auth()
export class UsersFavoriteGamesController {
  constructor(private readonly service: UsersFavoriteGamesService) {}

  @Get(':userId')
  findFavorites(@Param() request: FindUserFavoriteGamesDto) {
    return this.service.findUserFavorites(request);
  }

  @Post()
  addFavorite(
    @Body() body: CreateUserFavoriteGameDto,
    @GetUser() user: UserEntity, //Coge la info del user autenticado
  ) {
    return this.service.addFavorite(user.id, body.gameId);
  }

  @Delete(':userFavoriteGameId')
  deleteFavorite(
    @Param('userFavoriteGameId') userFavoriteGameId: string,
    @GetUser() user: UserEntity,
  ) {
    return this.service.deleteFavorite(user.id, userFavoriteGameId);
  }
}
