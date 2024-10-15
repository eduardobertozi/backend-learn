import { IAuthService } from "@/interfaces/auth.service";

export type TokenAuthParams = {
  username: string
  token: string
}

export class TokenAuthService implements IAuthService {
  async authenticate(params: TokenAuthParams): Promise<boolean> {
    return params.token === 'valid-token'
  }
}