import express, { Request, Response } from 'express';
import { AppDataSource } from "./dataSource"
import { User } from './entities/user' 
import router from './router';
import 'dotenv'
import cookieParser from "cookie-parser"
import morgan  from "morgan"

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(morgan("dev"))


app.get('/', async (req: Request, res: Response) => {
    res.send('<h1>시작하는 지점</h1>');
  });
  
app.use("api",router)


export default app