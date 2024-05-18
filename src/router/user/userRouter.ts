import express from 'express';
import passport from 'passport';
import { UserController } from '../../controller/userController';

let router = express.Router();
const userController = new UserController();

router.post('/sign-up', userController.signupController);

//router.post('/idcheck', UserController.idCheckController);

export default router;
