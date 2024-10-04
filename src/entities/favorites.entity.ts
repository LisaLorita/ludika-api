// import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
// import { Game } from './game.entity';
// import { User } from './user.entity';

// @Entity('favorites')
// export class UserFavorite {
//   @PrimaryColumn('uuid')
//   UserId: string;

//   @PrimaryColumn('uuid')
//   GameId: string;

//   @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
//   @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
//   user: User;

//   @ManyToOne(() => Game, (game) => game.favorites, { onDelete: 'CASCADE' })
//   @JoinColumn([{ name: 'gameId', referencedColumnName: 'id' }])
//   games: Game[];
// }
