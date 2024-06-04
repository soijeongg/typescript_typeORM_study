import express,{Response, Request} from 'express';
import passport from 'passport';
import { UserController } from '../../controller/userController';
import { UserService } from '../../service/UserService';

let router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/sign-up', userController.signupController);
router.put('/user',userController.updateUsercontroller)
router.delete('/user', userController.deleteUsercontroller)
router.get('/user',userController.getUserIdController)


export default router;
