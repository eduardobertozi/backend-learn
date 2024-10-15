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
      const isAuthenticated = await this.authService.authenticate(body)

      if (!isAuthenticated) {
        return ResponseHandler.error(reply, 'Unauthorized', 401)
      }

      return ResponseHandler.success(reply, 'success', { user: body.username })  
    } catch (err) {
      ResponseHandler.error(reply, 'Internal Server Error', 500)
    }
  }
}