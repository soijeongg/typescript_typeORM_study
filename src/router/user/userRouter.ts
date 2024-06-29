import express from 'express';
import { UserController } from '../../controller/userController';
import { UserService } from '../../service/UserService';
import { UserRepository } from '../../respository';
import verfiyJWT from '../../middleware/verfiyJWT';

let router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/sign-up', userController.signupController);
router.put('/user', verfiyJWT, userController.updateUsercontroller);
router.delete('/user', verfiyJWT, userController.deleteUsercontroller);
router.get('/user', verfiyJWT, userController.getUserIdController);

export default router;
