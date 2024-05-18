import { IuserRespository } from './iuserRespository';
import { IUser } from './iuser';
import { IUserRequest } from './iuserRequest';

export interface IuserService {
  createUserService(user: IUserRequest): Promise<IUser>;
}
