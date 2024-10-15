import { IAuthService } from "@/interfaces/auth.service";

export type AuthServiceParams = {
  username: string
  password: string
}

export class AuthService implements IAuthService {
  async authenticate(params: AuthServiceParams): Promise<boolean> {
    return params.username === 'admin' && params.password === 'admin'
  }
}