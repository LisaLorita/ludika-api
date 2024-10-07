import { IsUUID } from 'class-validator';

export class DeleteUserFavoriteGameDto {
  @IsUUID()
  userFavoriteGameId: string;
}
