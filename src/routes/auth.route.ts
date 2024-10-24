import { FastifyInstance } from "fastify";
import { AuthServiceFactory } from "@/factories/auth-service.factory";
import { AuthController } from "@/controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  const authService = AuthServiceFactory.create()
  const authController = new AuthController(authService)
  
  app.post('/login', async (request, reply) => {
    await authController.login(request, reply)
  })
}