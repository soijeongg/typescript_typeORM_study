import { IuserService } from '../interfaces/user/iuserService';
import { IuserRespository } from '../interfaces/user/iuserRespository';
import {
  IUserRequest,
  IUserUpdateRequest,
} from '../interfaces/user/iuserRequest';
import { IUser } from '../interfaces/user/iuser';
import { UserRepository } from '../respository';
import * as argon2 from 'argon2';

export class UserService implements IuserService {
  private UserRepository: IuserRespository;

  constructor(userRepository: IuserRespository) {
    this.UserRepository = userRepository;
  }
  async createUserService(userRequest: IUserRequest): Promise<IUser> {
    userRequest.password = await argon2.hash(userRequest.password);
    return await this.UserRepository.createUser(userRequest);
  }
  async updateUserService(
    userId: number,
    user: IUserUpdateRequest,
  ): Promise<IUser | null> {
    if (user.password) {
      user.password = await argon2.hash(user.password);
    }
    const updatedUser = await this.UserRepository.updateUser(userId, user);
    if (!updatedUser) {
      throw new Error('유저를 찾을 수 없거나 업데이트를 할 수 없습니다');
    }
    console.log(updatedUser, 'sds');
    return updatedUser;
  }
  async deleteUserService(userId: number): Promise<boolean> {
    const deleteUser = await this.UserRepository.deleteUser(userId);
    if (!deleteUser) {
      throw new Error('유저를 찾을 수 없거나 삭제할 수 없습니다');
    }
    return deleteUser;
  }
  async getUserbyIdService(userId: number): Promise<IUser | null> {
    const getUserId = this.UserRepository.getUserByID(userId);
    if (!getUserId) {
      return null;
    }
    return getUserId;
  }
  async getallUserService(): Promise<IUser[]> {
    const user = await this.UserRepository.getAllUsers();
    return user;
  }
}
