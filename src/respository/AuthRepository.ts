import { AppDataSource } from '../dataSource';
import { IUser } from '../interfaces/user/iuser';
import { User } from '../entities';

export class authRepostiory {
  private userRepository = AppDataSource.getRepository(User); //유저를 레포지토리라고 한거네
  constructor() {}
  //이메일이 있는지 확인한다 있으면 반환
  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null;
  }
}
