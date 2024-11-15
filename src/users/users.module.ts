import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  exports: [UsersService],
})
export class UsersModule {}
