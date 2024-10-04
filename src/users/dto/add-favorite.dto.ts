import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddFavoriteDto {
  @ApiProperty()
  @IsNotEmpty()
  gameId: string;
}
