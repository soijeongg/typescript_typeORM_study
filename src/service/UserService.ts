import { IuserService } from '../interfaces/user/iuserService';
import { IuserRespository } from '../interfaces/user/iuserRespository';
import { IUserRequest } from '../interfaces/user/iuserRequest';
import { IUser } from '../interfaces/user/iuser';
import { UserRepository } from '../respository/UserRespository';

export class UserService implements IuserService {
  private userRepository: IuserRespository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUserService(userRequest: IUserRequest): Promise<IUser> {
    return await this.userRepository.createUser(userRequest);
  }
}
