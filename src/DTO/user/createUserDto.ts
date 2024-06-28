export class createUserDTO {
  name: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
    this.name = username;
    this.email = email;
    this.password = password;
  }
}
