import express from 'express';
import { UserController } from '../../controller/userController';
import { UserService } from '../../service/UserService';
import { UserRepository } from '../../respository';

let router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post('/sign-up', userController.signupController);
router.put('/user', userController.updateUsercontroller);
router.delete('/user', userController.deleteUsercontroller);
router.get('/user', userController.getUserIdController);

export default router;
