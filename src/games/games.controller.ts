import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'Return all games.' })
  @Get()
  getGames() {
    return this.gamesService.findAll();
  }

  @ApiOperation({ summary: 'Get games by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  getGameById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gamesService.findById(id);
  }

  @ApiOperation({ summary: 'Create games' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Post()
  createGame(@Body() body: CreateGameDto) {
    return this.gamesService.create(body);
  }

  @ApiOperation({ summary: 'Update games' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Patch(':id')
  updateGame(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateGameDto,
  ) {
    return this.gamesService.update(id, body);
  }

  @Delete(':id')
  removeGame(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
