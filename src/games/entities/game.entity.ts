import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GameGenres } from '../enums/games-genres.enum';

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
}
