import { FastifyReply, FastifyRequest } from "fastify";
import { Role } from "../types";
import { ResponseHandler } from "@/util/response-handler";
import { User } from "@/interfaces/user";
import { TokenAuthService } from "@/services/token-auth.service";

export function authorize(roles: Role[]) {
  const tokenService = new TokenAuthService()
  
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      ResponseHandler.error(reply, 'Authorization header missing', 401)
      return
    }
    
    const token = authHeader.split(" ")[1]

    try {
      const decoded = tokenService.verifyToken(token) as User
      const userRole = decoded.role

      // Verifica se o usuário tem uma das roles necessárias
      if (roles.length && !roles.includes(userRole)) {
        ResponseHandler.error(reply, 'Forbidden: You do not have the required role', 403)
        return
      }

      // Adiciona o usuário decodificado à requisição para uso posterior
      request.user = decoded
    } catch (error) {
      ResponseHandler.error(reply, 'Invalid token', 401)
      return
    }
  }
}
