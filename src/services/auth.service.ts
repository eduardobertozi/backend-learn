import { IAuthService } from "@/interfaces/auth.service";
import { UserService } from "./user.service";
import { TokenAuthService } from "./token-auth.service";

export class AuthService implements IAuthService {
  constructor(
    private userService: UserService,
    private tokenAuthService: TokenAuthService
  ) {}  
  
  async authenticate(params: { username: string, password: string }): Promise<string> {
    const user = await this.userService.findUser(params.username, params.password)
    
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = this.tokenAuthService.generateToken({
      username: user.username, role: user.role
    })

    return token
  }
}