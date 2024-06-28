import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { AppDataSource } from './dataSource';
import passport from 'passport';
import router from './router';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cors from 'cors';
import passportConfig from './utils/passportConfig';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import notfounderror from './middleware/notfounderror';
import errorHandler from './middleware/errorHandler';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
AppDataSource.initialize()
  .then(() => {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cookieParser());
    app.use(morgan('dev'));
    passportConfig();
    app.use(passport.initialize());
    app.get('/', async (req: Request, res: Response) => {
      res.send('<h1>시작하는 지점</h1>');
    });

    app.use('/api', router);
    app.use(notfounderror);
    app.use(errorHandler);
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
export default app;
