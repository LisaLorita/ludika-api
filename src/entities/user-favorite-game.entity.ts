import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { GameEntity } from './game.entity';

@Entity('user_favorite_game')
@Unique(['userId', 'gameId'])
export class UserFavoriteGameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  gameId: string;

  @ManyToOne(() => UserEntity, (user) => user.favoriteGames, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => GameEntity, (game) => game.favoriteGames, {
    onDelete: 'CASCADE',
  })
  game: GameEntity;
}
