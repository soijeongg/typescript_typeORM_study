import express from 'express';
import userRouter from './user/user.router.ts';
import postRouter from './post/post.router.ts';
import commentRouter from './comment/comment.router.ts';

const router  = express.Router()
router.use('/',userRouter, postRouter, commentRouter)


export default router
