import jwt from 'jsonwebtoken'
import { ITokenService } from "@/interfaces/token.service"

export class TokenAuthService implements ITokenService {  
  constructor(
    private secretKey: string = 'my-secret-key',
    private expirationTime: string = '1d'
  ) {}
  
  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: this.expirationTime })
  }

  verifyToken(token: string): object | string {
    return jwt.verify(token, this.secretKey)
  }
}