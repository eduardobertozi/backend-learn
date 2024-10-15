import { IAuthService } from "@/interfaces/auth.service";
import { AuthService } from "@/services/auth.service";
import { TokenAuthService } from "@/services/token-auth.service";

export class AuthServiceFactory {
  static create(type: 'basic' | 'token'): IAuthService  {
    return type === 'token' ? new TokenAuthService() : new AuthService()
  }
}