import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameGenres } from '../games/enums/games-genres.enum';
import { UserFavoriteGameEntity } from './user-favorite-game.entity';

@Entity('game')
export class GameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({})
  description: string;

  @Column({
    type: 'enum',
    enum: GameGenres,
  })
  genre: GameGenres;

  @Column()
  players: number;

  // @Column({
  //   unique: true,
  // })
  // photoUrl: string;

  @Column()
  year: Date;

  @Column()
  isDiscontinued: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'now()',
  })
  updatedAt: Date;

  @OneToMany(
    () => UserFavoriteGameEntity,
    (userGameFavorite) => userGameFavorite.game,
  )
  favoriteGames: UserFavoriteGameEntity[];
}
