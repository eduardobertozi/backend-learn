import { FastifyInstance } from "fastify";
import { authorize } from "@/middlewares/authorize";
import { ResponseHandler } from "@/util/response-handler";

export async function protectedRoutes(fastify: FastifyInstance) {
  fastify.get('/admin', { preHandler: authorize(['admin']) }, async (request, reply) => {
    ResponseHandler.success(
      reply, 
      'Access granted for admin', 
      { 
        user: request.user 
    })
  })

  fastify.get('/user', { preHandler: authorize(['user']) }, async (request, reply) => {
    ResponseHandler.success(
      reply, 
      'Access granted for user', 
      { 
        user: request.user 
    })
  })
}