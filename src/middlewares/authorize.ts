import { FastifyReply, FastifyRequest } from "fastify";
import { User, Role } from "../types";
import { ResponseHandler } from "@/util/response-handler";

export function authorize(allowedRoles: Role[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user as User
    
    if (!user || !allowedRoles.includes(user.role)) {
      reply.status(403).send({ success: false, message: 'Forbidden' })
      return
    }
  }
}
