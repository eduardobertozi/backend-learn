import { FastifyInstance } from "fastify";
import { AuthServiceFactory } from "@/factories/auth-service.factory";
import { AuthController } from "@/controllers/auth.controller";
import { z } from "zod";

export async function authRoutes(app: FastifyInstance) {
  const authService = AuthServiceFactory.create()
  const authController = new AuthController(authService)

  const loginSchema = z.object({
    username: z.string({
      required_error: 'Username is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }).min(6, {
      message: 'Password must be at least 6 characters',
    })
  })
  
  app.post('/login', {
    schema: {
      body: loginSchema,
    },
  }, authController.login.bind(authController))
}