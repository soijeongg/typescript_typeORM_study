import { AppDataSource } from '../dataSource';
import { getRepository } from 'typeorm';
import { IUser } from '../interfaces/user/iuser';
import { IuserRespository } from '../interfaces/user/iuserRespository';
import {
  IUserRequest,
  IUserUpdateRequest,
} from '../interfaces/user/iuserRequest';
import { User } from '../entities/user';

export class UserRepository implements IuserRespository {
  private userRepository =  AppDataSource.getRepository(User);

  async createUser(userRequest: IUserRequest): Promise<IUser> {
    const newUser = this.userRepository.create(userRequest);
    const savedUser = await this.userRepository.save(newUser);
    return {
      userId: savedUser.userId,
      email: savedUser.email,
      password: savedUser.password,
      name: savedUser.name,
    };
  }
  async getAllUsers(): Promise<IUser[]> {
    return await this.userRepository.find();
  }
  async getUserByID(userId: number): Promise<IUser | null> {
    return await this.userRepository.findOne({ where: { userId } });
  }
  async updateUser(
    userId: number,
    user: Partial<IUserUpdateRequest>,
  ): Promise<IUser | null> {
    await this.userRepository.update(userId, user);
    return await this.getUserByID(userId);
  }
  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.userRepository.delete(userId);
    return result.affected != 0;
  }
}
//affected는 typeorm애 재공하는 속성 중 하나 실제로 영향받은 줄의 행의 수를 나타냄
