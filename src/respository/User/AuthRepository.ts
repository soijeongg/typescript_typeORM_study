import { AppDataSource } from '../../dataSource';
import { IUser } from '../../interfaces/user/iuser';
import { User } from '../../entities';
import { iauthRepository } from '../../interfaces/auth/iauthRepository';

export class authRepostiory implements iauthRepository {
  private userRepository = AppDataSource.getRepository(User); //유저를 레포지토리라고 한거네
  constructor() {}
  //이메일이 있는지 확인한다 있으면 반환
  public async checkEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user || null;
  }
}
