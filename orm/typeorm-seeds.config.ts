import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import * as dotenv from 'dotenv';
dotenv.config();

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: ['src/**/!(*example*).entity.ts'],
  seeds: ['orm/seeds/*.ts'],
};
console.log('dataSourceOptions', dataSourceOptions);
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
