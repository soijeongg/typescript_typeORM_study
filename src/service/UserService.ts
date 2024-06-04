import { IuserService } from '../interfaces/user/iuserService';
import { IuserRespository } from '../interfaces/user/iuserRespository';
import { IUserRequest, IUserUpdateRequest } from '../interfaces/user/iuserRequest';
import { IUser } from '../interfaces/user/iuser';
import { UserRepository } from '../respository/UserRespository';
import * as argon2 from 'argon2';

export class UserService implements IuserService {
  private userRepository: IuserRespository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  async createUserService(userRequest: IUserRequest): Promise<IUser> {
    userRequest.password = await argon2.hash(userRequest.password);
    return await this.userRepository.createUser(userRequest);
  }
  async updateUserService(userId: number, user: IUserUpdateRequest): Promise<IUser |null> {
    const updatedUser = await this.userRepository.updateUser(userId, user);
    if (!updatedUser ) {
      throw new Error('유저를 찾을 수 없거나 업데이트를 할 수 없습니다');
    }
    return updatedUser;
  }
  async deleteUserService(userId: number): Promise<boolean> {
      const deleteUser = await this.userRepository.deleteUser(userId)
      if(!deleteUser) {
        throw new Error('유저를 찾을 수 없거나 삭제할 수 없습니다')
      }
      return deleteUser;
  }
  async getUserbyIdService(userId: number): Promise<IUser |null> {
    const getUserId =  this.userRepository.getUserByID(userId)
    if(!getUserId) {
      return null;
    }
    return getUserId;
      
  }
      
  }
