import { FastifyReply, FastifyRequest } from "fastify";
import { IAuthService } from "@/interfaces/auth.service";
import { ResponseHandler } from "@/util/response-handler";

type AuthLoginRequest = {
  username: string
  password: string
  token: string
}

export class AuthController {
  constructor(
    private authService: IAuthService,
  ) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as AuthLoginRequest
    
    try {
      const isAuthenticated = await this.authService
        .authenticate({ username: body.username, password: body.password })

      if (!isAuthenticated) {
        return ResponseHandler.error(reply, 'Unauthorized', 401)
      }

      const token = this.authService.generateToken(isAuthenticated)

      return ResponseHandler.success(reply, 'Login successful', { token }) 
    } catch (err) {
      console.log(err)
      ResponseHandler.error(reply, 'Internal Server Error', 500)
    }
  }
}