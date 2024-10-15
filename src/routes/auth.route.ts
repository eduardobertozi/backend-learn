import { FastifyInstance } from "fastify";
import { AuthController } from "@/controllers/auth.controller";
import { AuthService } from "@/services/auth.service";
import { TokenAuthService } from "@/services/token-auth.service";

export async function authRoutes(app: FastifyInstance) {
  const authService = new AuthService()
  const tokenAuthService = new TokenAuthService()
  const authController = new AuthController(authService)
  const tokenAuthController = new AuthController(tokenAuthService)

  app.post('/login', async (request, reply) => {
    await authController.login(request, reply)
  })

  app.post('/login/token', async (request, reply) => {
    await tokenAuthController.login(request, reply)
  })
}