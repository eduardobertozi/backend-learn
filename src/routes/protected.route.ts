import { FastifyInstance } from "fastify";
import { authorize } from "@/middlewares/authorize";

export async function protectedRoutes(fastify: FastifyInstance) {
  fastify.get('/admin', { preHandler: authorize(['admin']) }, async (request, reply) => {
    console.log(request.user)
    reply.send({ success: true, message: 'Welcome admin!' })
  })

  fastify.get('/user', { preHandler: authorize(['user', 'admin']) }, async (request, reply) => {
    reply.send({ success: true, message: 'Welcome user!' })
  })
}