import express from 'express';
import { AuthController } from '../../controller/authController';
import { authService } from '../../service/authService';
import { authRepostiory } from '../../respository';
import checkLoginHandler from '../../middleware/checkLoginHandler';

let router = express.Router();
const AuthRepostiory = new authRepostiory();
const AuthService = new authService(AuthRepostiory);
const authController = new AuthController(AuthService);

router.post('/login', checkLoginHandler, authController.loginController);
router.get('/logout', checkLoginHandler, authController.logOutController);
export default router;
