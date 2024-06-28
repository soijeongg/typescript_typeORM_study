import { IUser } from './iuser';
import { IUserRequest, IUserUpdateRequest } from './iuserRequest';

export interface IuserRespository {
  createUser(user: IUserRequest): Promise<IUser>;
  updateUser(userId: number, user: IUserUpdateRequest): Promise<IUser | null>;
  deleteUser(userId: number): Promise<boolean>;
  getUserByID(userId: number): Promise<IUser | null>;
  checkId(userEmail: string): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
}
