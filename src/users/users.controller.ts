import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  // Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from './enums/valid-roles.enum';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  @Get()
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERUSER)
  getUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Get(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERUSER)
  getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Update users' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @ApiConflictResponse({
    status: 409,
    description: 'Conflict: User name already exists',
  })
  @Patch(':id')
  @Auth(ValidRoles.ADMIN, ValidRoles.SUPERUSER)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.usersService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiBadRequestResponse({ status: 400, description: 'Bad Request' })
  @Delete(':id')
  @Auth(ValidRoles.SUPERUSER)
  removeUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
