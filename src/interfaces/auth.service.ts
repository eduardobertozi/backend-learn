import { User } from "./user";

export interface IAuthService {
  authenticate(params: any): Promise<User | null>
  generateToken(user: User): string
}