import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getGames() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  getGameById(@Param('id') id: string) {
    return this.gamesService.findById(id);
  }

  @Post()
  createGame(@Body() body: CreateGameDto) {
    return this.gamesService.create(body);
  }
}
