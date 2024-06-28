import { IuserRespository } from './iuserRespository';
import { IUser } from './iuser';
import { IUserRequest, IUserUpdateRequest } from './iuserRequest';

export interface IuserService {
  createUserService(user: IUserRequest): Promise<IUser>;

  updateUserService(
    userId: number,
    user: IUserUpdateRequest,
  ): Promise<IUser | null>;

  getUserbyIdService(userId: number): Promise<IUser | null>;

  deleteUserService(userId: number): Promise<boolean>;

  getallUserService(): Promise<IUser[]>;
}
