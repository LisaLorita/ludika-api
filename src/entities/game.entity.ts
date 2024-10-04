import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GameGenres } from '../games/enums/games-genres.enum';
import { User } from './user.entity';

@Entity()
export class Game {
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

  @ManyToMany(() => User, (user) => user.games)
  user?: User[];
}
