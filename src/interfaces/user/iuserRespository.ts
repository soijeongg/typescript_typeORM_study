import { IUser } from './iuser';
import { createUserDTO, updateUserDTO } from '../../DTO';

export interface IuserRespository {
  createUser(user: createUserDTO): Promise<IUser>;
  updateUser(userId: number, user: updateUserDTO): Promise<IUser | null>;
  deleteUser(userId: number): Promise<boolean>;
  getUserByID(userId: number): Promise<IUser | null>;
  checkId(userEmail: string): Promise<IUser | null>;
  getAllUsers(): Promise<IUser[]>;
}
