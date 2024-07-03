import { AppDataSource } from '../../dataSource';
import { IUser } from '../../interfaces/user/iuser';
import { IuserRespository } from '../../interfaces/user/iuserRespository';
import { updateUserDTO, createUserDTO } from '../../DTO';
import { User } from '../../entities';

export class UserRepository implements IuserRespository {
  private userRepository = AppDataSource.getRepository(User); //유저를 레포지토리라고 한거네
  constructor() {}
  async createUser(userRequest: createUserDTO): Promise<IUser> {
    const newUser = this.userRepository.create(userRequest);
    // 새 엔티티 로그
    // 데이터베이스에 새 유저 엔티티 저장
    const existingUser = await this.userRepository.findOne({
      where: { email: userRequest.email },
    });
    if (existingUser) {
      throw new Error('이메일이 이미 존재합니다');
    }
    const savedUser = await this.userRepository.save(newUser);

    // 저장된 유저 정보를 IUser 인터페이스에 맞게 반환
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
    user: Partial<updateUserDTO>,
  ): Promise<IUser | null> {
    const updateUser = await this.userRepository.update(userId, user);
    if (updateUser.affected) {
      return await this.getUserByID(userId);
    }
    return null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.userRepository.delete(userId);
    return result.affected != 0;
  }
  //affected는 typeorm애 재공하는 속성 중 하나 실제로 영향받은 줄의 행의 수를 나타냄

  async checkId(userEmail: string): Promise<IUser | null> {
    //이메일이 있는지를 확인한다
    const email = userEmail;
    return await this.userRepository.findOne({ where: { email } });
  }
}
