import { FastifyInstance } from "fastify";
import { authorize } from "@/middlewares/authorize";
import { ResponseHandler } from "@/util/response-handler";
import { z } from "zod";

export async function protectedRoutes(fastify: FastifyInstance) {
  const protectedRouteSchema = z.object({
    authorization: z.string({
      required_error: 'Authorization header missing',
    }).min(1, {
      message: 'Please provide a valid token',
    }),
  })
  
  fastify.get('/admin', { 
    schema: {
      headers: protectedRouteSchema
    },
    preHandler: authorize(['admin']) 
  }, async (request, reply) => {
    ResponseHandler.success(
      reply, 
      'Access granted for admin', 
      { 
        user: request.user 
    })
  })

  fastify.get('/user', { 
    schema: {
      headers: protectedRouteSchema
    },
    preHandler: authorize(['user']) 
  }, async (request, reply) => {
    ResponseHandler.success(
      reply, 
      'Access granted for user', 
      { 
        user: request.user 
    })
  })
}