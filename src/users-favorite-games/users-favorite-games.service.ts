import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFavoriteGameEntity } from 'src/entities/user-favorite-game.entity';
import { GamesService } from 'src/games/games.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
// import { CreateUserFavoriteGameDto } from './dto/create-user-favorite-game.dto';
import { FindUserFavoriteGamesDto } from './dto/find-user-favorite-games.dto';
// import { DeleteUserFavoriteGameDto } from './dto/delete-user-favorite-game.dto';

@Injectable()
export class UsersFavoriteGamesService {
  constructor(
    @InjectRepository(UserFavoriteGameEntity)
    private readonly repository: Repository<UserFavoriteGameEntity>,
    private readonly userService: UsersService,
    private readonly gameService: GamesService,
  ) {}

  async addFavorite(
    userId: string,
    gameId: string /*, request: CreateUserFavoriteGameDto*/,
  ) {
    // const { userId, gameId } = request;
    // const user = await this.userService.findById(userId);
    const game = await this.gameService.findById(gameId);
    const userFavoriteGame = new UserFavoriteGameEntity();
    userFavoriteGame.userId = userId;
    userFavoriteGame.game = game;

    return this.repository.save(userFavoriteGame);
  }

  async findUserFavorites(request: FindUserFavoriteGamesDto) {
    const { userId } = request;

    return this.repository.find({
      where: { userId },
      relations: ['game'],
    });
  }

  //Delete favorite verificando userId con el JWT
  async deleteFavorite(userId: string, userFavoriteGameId: string) {
    const userFavoriteGame = await this.repository.findOne({
      where: { id: userFavoriteGameId },
      relations: ['user'],
    });

    if (!userFavoriteGame) {
      throw new BadRequestException('User favorite game not found');
    }

    if (userFavoriteGame.userId !== userId) {
      throw new BadRequestException('You cannot delete this favorite game');
    }

    const { affected } = await this.repository.delete({
      id: userFavoriteGameId,
    });

    if (affected === 0) {
      throw new BadRequestException('Favorite game not deleted');
    }

    return { message: 'Favorite game deleted successfully' };
  }
}
// async deleteFavorite(request: DeleteUserFavoriteGameDto) {
//   const { userFavoriteGameId } = request;

//   const { affected } = await this.repository.delete({
//     id: userFavoriteGameId,
//   });

//   if (affected === 0) {
//     throw new BadRequestException('User favorite game not deleted');
//   }

//   return 'User favorite game deleted';
// }
