import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { UsersFavoriteGamesModule } from './users-favorite-games/users-favorite-games.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres', // Tipo de base de datos
      host: 'localhost', // Host de PostgreSQL
      port: 5432, // Puerto predeterminado de PostgreSQL
      username: 'admin', // Usuario de PostgreSQL
      password: 'admin', // Contraseña de PostgreSQL
      database: 'ludika', // Nombre de la base de datos
      synchronize: true, // Sincroniza la base de datos con las entidades (no recomendado en producción)
      autoLoadEntities: true, // Carga las entidades automáticamente
    }),
    UsersModule,
    GamesModule,
    UsersFavoriteGamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
