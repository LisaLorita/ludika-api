import { IsUUID } from 'class-validator';

export class CreateUserFavoriteGameDto {
  // @IsUUID()
  // userId: string;
  @IsUUID()
  gameId: string;
}
