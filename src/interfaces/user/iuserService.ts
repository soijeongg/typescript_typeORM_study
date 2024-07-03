import { IuserRespository } from './iuserRespository';
import { IUser } from './iuser';
import { createUserDTO, updateUserDTO } from '../../DTO';

export interface IuserService {
  createUserService(user: createUserDTO): Promise<IUser>;

  updateUserService(userId: number, user: updateUserDTO): Promise<IUser | null>;

  getUserbyIdService(userId: number): Promise<IUser | null>;

  deleteUserService(userId: number): Promise<boolean>;

  getallUserService(): Promise<IUser[]>;
}
