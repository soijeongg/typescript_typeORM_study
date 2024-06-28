export interface IauthService {
  login(email: string, password: string): Promise<string | null>;
}
