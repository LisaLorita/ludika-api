import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsInt,
  IsPositive,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { GameGenres } from '../enums/games-genres.enum';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsEnum(GameGenres)
  genre: GameGenres;
  @IsDateString()
  year: Date;
  @IsInt()
  @IsPositive()
  players: number;
  @IsInt()
  age: number;
  @IsBoolean()
  isDiscontinued: boolean;
}
