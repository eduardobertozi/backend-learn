import { FastifyInstance } from "fastify";
import { AuthServiceFactory } from "@/factories/auth-service.factory";
import { AuthController } from "@/controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  const authService = AuthServiceFactory.create('basic')
  const tokenAuthService = AuthServiceFactory.create('token')
  const authController = new AuthController(authService, tokenAuthService)
  
  app.post('/login', async (request, reply) => {
    await authController.login(request, reply)
  })
}