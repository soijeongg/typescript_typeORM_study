import { Request, Response,NextFunction } from 'express';
import { IuserController } from '../interfaces/user/iuserCotroller';
import { UserService } from '../service/UserService';
import { IUserRequest } from '../interfaces/user/iuserRequest';
import { createUserDTO,updateUserDTO,checkEmailDto } from '../DTO';
import { Jwt } from 'jsonwebtoken';
export class UserController implements IuserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = new UserService();
    this.signupController = this.signupController.bind(this);
    this.deleteUsercontroller = this.deleteUsercontroller.bind(this);
    
  }
  async signupController(req: Request, res: Response,next: NextFunction): Promise<Response> {
    try {
      const { username, email, password } = req.body;

      const userRequest = new createUserDTO(username, email, password);
      const user = await this.userService.createUserService(userRequest);
      if(!user) {
        return res.status(400).json({error:"회원 가입에 실패했습니다"})
      }

      return res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
  async updateUsercontroller(req: Request,res:Response, next:NextFunction):Promise<Response> {
    try {
      //res.locals.userId = 1;
     const userId = res.locals.userId 
      const { password, name } = req.body;
      if(!password &&! name) {
        return res.status(400).json({error:'업데이트할 정보가 입력되지 않았습니다'})
      }
      if(!password &&name) {
        const userRequest = new updateUserDTO(name);
        const user = await this.userService.updateUserService(userId,userRequest)
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
      }
    }
      if(password&&!name) {
        const userRequest = new updateUserDTO(password)
        const user = await this.userService.updateUserService(userId,userRequest);
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
      }
    }
      if(password &&name) {
        const userRequest = new updateUserDTO(password, name)
        const user = await this.userService.updateUserService(userId,userRequest);
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
      }
    }
    return res.status(500).json({'message':'업데이트에 실패했습니다 다시 한번 시도해주세요'})
    }catch(e) {
      next(e);
    }

  }
  async deleteUsercontroller(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      //res.locals.userId = 1;
      const userId = res.locals.userId;
      const deleteUser = await this.userService.deleteUserService(userId);
      if(!deleteUser) {
        return res.status(400).json({'message': '회원 삭제에 실패했습니다 다시 한번 시도해주세요'})
      }
      return res.status(201).json({'message':'회원 삭제에 성공했습니다'})
    }catch(e) {
      next(e)
    }
  }
  async getUserIdController(req: Request, res: Response): Promise<Response> {
    //res.locals.userId = 1;
    const userId = res.locals.userId;
    const getId = await this.userService.getUserbyIdService(userId)
    if(!getId) {
      return res.status(400).json ({error: "아이디를 가져오는 것에 실패했습니다"})
    }
    return res.status(201).json({'message': getId.name})
      
  }
  
  
}
