import { IAuthService } from "@/interfaces/auth.service";
import { UserService } from "./user.service";
import { TokenAuthService } from "./token-auth.service";
import { User } from "@/interfaces/user";

export class AuthService implements IAuthService {
  constructor(
    private userService: UserService,
    private tokenAuthService: TokenAuthService
  ) {}  
  
  async authenticate(params: { username: string, password: string }): Promise<User | null> {
    const user = await this.userService.findUser(params.username, params.password)
    
    if (!user) {
      return null
    }

    return user
  }

  generateToken(user: User): string {
    return this.tokenAuthService.generateToken({
      id: user.id,
      username: user.username,
      role: user.role,
    })
  }
}