import { IUser } from '../user/iuser';
import { iauth } from './iauth';
export interface iauthRepository {
  checkEmail(userEmail: string): Promise<IUser | null>;
}
