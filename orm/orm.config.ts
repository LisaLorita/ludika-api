import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: 'ludika',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  entities: ['src/**/!(*example*).entity.ts'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  logging: true,
  migrations: ['orm/migrations/*.ts'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
