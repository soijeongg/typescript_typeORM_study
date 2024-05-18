import express, { Request, Response } from 'express';
import passport from 'passport';
import router from './router';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import cors from 'cors';
import passportConfig from './utils/passportConfig';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path  from 'path'

dotenv.config({path:path.resolve(__dirname,'../.env')});
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

app.use(passport.initialize());
passportConfig(passport);

app.get('/', async (req: Request, res: Response) => {
  res.send('<h1>시작하는 지점</h1>');
});

app.use('api', router);

export default app;
