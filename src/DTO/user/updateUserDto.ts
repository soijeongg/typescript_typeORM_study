export class updateUserDTO {
  username?: string;
  password?: string;
  constructor(username?: string, password?: string) {
    if (username !== undefined) {
      this.username = username;
    }
    if (password !== undefined) {
      this.password = password;
    }
  }
}
