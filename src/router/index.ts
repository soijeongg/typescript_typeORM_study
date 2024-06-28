import express from 'express';
import userRouter from './user/userRouter';
import authRouter from './user/authRouter';
//import postRouter from './post/post.router.ts';
//import commentRouter from './comment/comment.router.ts';

const router = express.Router();
router.use('/', userRouter, authRouter);

export default router;
