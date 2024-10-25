import { IAuthService } from "@/interfaces/auth.service";
import { UserService } from "./user.service";
import { TokenAuthService } from "./token-auth.service";
import { User } from "@/interfaces/user";

export class AuthService implements IAuthService {
  constructor(
    private userService: UserService,
    private tokenAuthService: TokenAuthService
  ) {}  
  
  async authenticate(params: { username: string, password: string }): Promise<User> {
    const user = await this.userService.findUser(params.username, params.password)
    
    if (!user) {
      throw new Error('Invalid credentials')
    }

    return user
  }

  async getToken(user: User) {
    return this.tokenAuthService.generateToken({
      id: user.id,
      username: user.username,
      role: user.role
    })
  }
}