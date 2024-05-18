import { IUser } from './iuser';
import { IUserRequest } from './iuserRequest';

export interface IuserRespository {
  createUser(user: IUserRequest): Promise<IUser>;
  updateUser(userId: number, user: IUserRequest): Promise<IUser | null>;
  deleteUser(userId: number): Promise<boolean>;
  getUserByID(userId: number): Promise<IUser | null>;
}
