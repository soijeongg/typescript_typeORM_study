export interface IUserRequest {
  email: string;
  password: string;
  name: string;
}

export interface IUserUpdateRequest {
  email?: string;
  password?: string;
  name?: string;
}

export interface IuserDeleteRequest {
  userId: number;
}