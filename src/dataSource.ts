import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User, Comment,Posts, Categories,subCategories, AccessToken, RefreshToken,BlacklistedToken } from './entities';
import * as dotenv from 'dotenv'
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  ssl: {
    rejectUnauthorized: false,
  },
  logging: process.env.TYPEORM_LOGGING === 'true',
  entities: [User,Posts, Comment, Categories, subCategories,AccessToken, RefreshToken, BlacklistedToken],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
