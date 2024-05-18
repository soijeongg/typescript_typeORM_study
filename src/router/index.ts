import express from 'express';
import userRouter from './user/userRouter';
//import postRouter from './post/post.router.ts';
//import commentRouter from './comment/comment.router.ts';

const router = express.Router();
router.use('/',userRouter)

export default router;
