import express from 'express';
import userRouter from './user/userRouter';
import authRouter from './user/authRouter';
import categoriesRouter from './categories/index';
//import postRouter from './post/post.router.ts';
//import commentRouter from './comment/comment.router.ts';

const router = express.Router();
router.use('/', userRouter, authRouter, categoriesRouter);

export default router;
