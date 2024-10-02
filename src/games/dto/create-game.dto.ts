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
  title: string;
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
  @IsBoolean()
  isDiscontinued: boolean;
}
