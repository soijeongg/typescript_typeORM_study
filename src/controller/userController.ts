import { Request, Response, NextFunction } from 'express';
import { IuserController } from '../interfaces/user/iuserCotroller';
import { UserService } from '../service/UserService';
import { createUserDTO, updateUserDTO } from '../DTO';
import { JwtPayload } from 'jsonwebtoken';
export class UserController implements IuserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
    this.signupController = this.signupController.bind(this);
    this.deleteUsercontroller = this.deleteUsercontroller.bind(this);
    this.getAlluserController = this.getAlluserController.bind(this);
    this.getUserIdController = this.getUserIdController.bind(this);
    this.updateUsercontroller = this.updateUsercontroller.bind(this);
  }
  //자바스크립트는 기본적으로 자신이 호출된 컨텍스트를 참조하는데 클래스의 메서드를 다른곳에서 사용할때
  // this가 기대한 대로 클래스 인스턴스를 가르키지 않을 수 있음
  //this를  제대로 바인딩하면 이 유저 컨트롤러를 가르키게 됨
  async signupController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { username, email, password } = req.body;

      const userRequest = new createUserDTO(username, email, password);
      const user = await this.userService.createUserService(userRequest);
      if (!user) {
        return res.status(400).json({ error: '회원 가입에 실패했습니다' });
      }
      return res.status(201).json(user);
    } catch (error) {
      return next(error);
    }
  }
  async getAlluserController(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const allUser = await this.userService.getallUserService();
      if (!allUser) {
        return res.status(400).json({ error: '다시 시도해주세요' });
      }
      return res.status(201).json({ allUser });
    } catch (error) {
      next(error);
      return res.status(400).json({ error: '다시 시도해주세요' });
    }
  }

  async updateUsercontroller(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const user = req.user as any;
      const userId = user.id;
      const { password, name } = req.body;
      if (!password && !name) {
        return res
          .status(400)
          .json({ error: '업데이트할 정보가 입력되지 않았습니다' });
      }
      if (!password && name) {
        const userRequest = new updateUserDTO(name);
        const user = await this.userService.updateUserService(
          userId,
          userRequest,
        );
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
        }
      }
      if (password && !name) {
        const userRequest = new updateUserDTO(password);
        const user = await this.userService.updateUserService(
          userId,
          userRequest,
        );
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
        }
      }
      if (password && name) {
        const userRequest = new updateUserDTO(password, name);
        const user = await this.userService.updateUserService(
          userId,
          userRequest,
        );
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: '사용자를 찾을 수 없습니다' });
        }
      }
      return res
        .status(500)
        .json({ message: '업데이트에 실패했습니다 다시 한번 시도해주세요' });
    } catch (e) {
      next(e);
      return res
        .status(500)
        .json({ message: '업데이트에 실패했습니다 다시 한번 시도해주세요' });
    }
  }
  async deleteUsercontroller(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const user = req.user as any;
      const userId = user.id;
      const deleteUser = await this.userService.deleteUserService(userId);
      if (!deleteUser) {
        return res
          .status(400)
          .json({ message: '회원 삭제에 실패했습니다 다시 한번 시도해주세요' });
      }
      return res.status(201).json({ message: '회원 삭제에 성공했습니다' });
    } catch (error) {
      next(error);
      return res
        .status(400)
        .json({ message: '회원 삭제에 실패했습니다 다시 한번 시도해주세요' });
    }
  }
  async getUserIdController(req: Request, res: Response): Promise<Response> {
    const user = req.user as any;
    const userId = user.id;
    console.log(userId);
    const getId = await this.userService.getUserbyIdService(userId);
    if (!getId) {
      return res
        .status(400)
        .json({ error: '아이디를 가져오는 것에 실패했습니다;' });
    }
    return res.status(201).json({ message: getId.name });
  }
}
