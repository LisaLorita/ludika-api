import { IsUUID } from 'class-validator';

export class FindUserFavoriteGamesDto {
  @IsUUID()
  userId: string;
}
