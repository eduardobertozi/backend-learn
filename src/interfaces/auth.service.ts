import { User } from "./user";

export interface IAuthService {
  authenticate(params: any): Promise<User>
  getToken(user: User): Promise<string>
}