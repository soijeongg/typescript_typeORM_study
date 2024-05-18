import { Request, Response } from 'express';
import { IuserController } from '../interfaces/user/iuserCotroller';
import { UserService } from '../service/UserService';
import { IUserRequest } from '../interfaces/user/iuserRequest';

export class UserController implements IuserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.signupController = this.signupController.bind(this);
  }
  async signupController(req: Request, res: Response): Promise<Response> {
    try {
      const userRequest: IUserRequest = req.body;
      let { email, password, name } = userRequest;
      const user = await this.userService.createUserService(userRequest);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: '다시 한번 시도해주세요' });
    }
  }
}
