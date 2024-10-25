import { FastifyInstance } from "fastify";
import { AuthServiceFactory } from "@/factories/auth-service.factory";
import { AuthController } from "@/controllers/auth.controller";
import { ErrorResponse, UserSchema } from "@/schemas";

export async function authRoutes(app: FastifyInstance) {
  const authService = AuthServiceFactory.create()
  const authController = new AuthController(authService)
  
  app.post('/login', {
    schema: {
      response: {
        200: UserSchema,
        404: ErrorResponse,
      }
    },
  },async (request, reply) => {
    await authController.login(request, reply)
  })
}