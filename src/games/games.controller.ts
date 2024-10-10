import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FindGameByNameDto } from './dto/find-game-name.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/users/enums/valid-roles. enum';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Get all games' })
  @ApiResponse({ status: 200, description: 'Return all games.' })
  @Get()
  @Auth()
  getGames() {
    return this.gamesService.findAll();
  }

  @Get('search')
  @Auth()
  async getGameByName(@Query() query: FindGameByNameDto) {
    return await this.gamesService.findByName(query.name);
  }

  @ApiOperation({ summary: 'Get games by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERUSER)
  getGameById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.gamesService.findById(id);
  }

  @ApiOperation({ summary: 'Create games' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Post()
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERUSER)
  createGame(@Body() body: CreateGameDto) {
    return this.gamesService.create(body);
  }

  @ApiOperation({ summary: 'Update games' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Patch(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERUSER)
  updateGame(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateGameDto,
  ) {
    return this.gamesService.update(id, body);
  }

  @Delete(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERUSER)
  removeGame(@Param('id', ParseUUIDPipe) id: string) {
    return this.gamesService.remove(id);
  }
}
