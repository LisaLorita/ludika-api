/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserEntity } from '../../src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ValidRoles } from '../../src/users/enums/valid-roles.enum';

export default class UserSeed implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const name = 'Admin';
    const email = 'admin@admin.com';
    const password = bcrypt.hashSync('Admin123!', 10);
    const roles = [ValidRoles.ADMIN];

    const userEntity = new UserEntity(name, email, password, roles);

    try {
      await dataSource.createEntityManager().save<UserEntity>(userEntity);
      console.log('UserSeed -> User created :)');
    } catch (error) {
      console.log('UserSeed error -> ', error.message);
    }
  }
}
