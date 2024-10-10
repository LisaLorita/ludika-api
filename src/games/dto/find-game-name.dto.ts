import { IsString } from 'class-validator';

export class FindGameByNameDto {
  @IsString()
  name: string;
}
