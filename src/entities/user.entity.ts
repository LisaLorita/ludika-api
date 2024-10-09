import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { UserFavoriteGameEntity } from './user-favorite-game.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
    select: false,
  })
  password: string;

  // @Column('text', {
  //   array: true,
  //   default: ['user'],
  // })
  // roles: string[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'now()',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'now()',
  })
  updatedAt: Date;

  //Relacion tabla favoritos
  @OneToMany(
    () => UserFavoriteGameEntity,
    (UserGameFavoriteEntity) => UserGameFavoriteEntity.user,
  )
  favoriteGames: Relation<UserFavoriteGameEntity[]>;

  @BeforeInsert()
  fieldsBeforeInsertCheck() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  fieldsBeforeUpdateCheck() {
    this.fieldsBeforeInsertCheck();
  }
}
