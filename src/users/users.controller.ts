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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddFavoriteDto } from './dto/add-favorite.dto';
//import { CreateUserDto } from './create-user.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Create users' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @ApiOperation({ summary: 'Update users' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiConflictResponse({
    status: 409,
    description: 'Conflict: User name already exists',
  })
  @Patch(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Get(':userId/favorites')
  async getUserFavorites(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.usersService.getUserFavorites(userId);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Post(':userId/favorites')
  addFavorite(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() body: AddFavoriteDto,
  ) {
    return this.usersService.addFavorite(userId, body);
  }
}
