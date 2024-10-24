import { InMemoryUserRepository } from "@/repositories/user.repository";
import { AuthService } from "@/services/auth.service";
import { TokenAuthService } from "@/services/token-auth.service";
import { UserService } from "@/services/user.service";

export class AuthServiceFactory {
  static create() {
    const userRepository = new InMemoryUserRepository()
    const userService = new UserService(userRepository)
    const tokenAuthService = new TokenAuthService('my-secret-key', '1h')
    return new AuthService(userService, tokenAuthService) 
  }
}