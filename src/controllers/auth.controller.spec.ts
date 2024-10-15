import { AuthServiceFactory } from "@/factories/auth-service.factory";
import { AuthController } from "./auth.controller";
import { FastifyReply } from "fastify";
import { vi } from "vitest"
import { IAuthService } from "@/interfaces/auth.service";

describe('AuthController', () => {
  const reply = {
    send: vi.fn(),
    status: vi.fn().mockReturnThis(),
  } as unknown as FastifyReply

  const authServiceMock: IAuthService = {
    authenticate: vi.fn().mockResolvedValue(true)
  }
  
  const controller = new AuthController(authServiceMock, authServiceMock)

  it('Should authenticate with valid credentials', async () => {
    const request = {
      body: {
        username: 'admin',
        password: '1234'
      }
    } as any
    
    await controller.login(request, reply)
    
    expect(reply.send).toHaveBeenCalledWith({
      success: true,
      message: 'Login successful',
      data: { user: 'admin' },
    })
  })

  it('Should reject authentication with invalid token', async () => {
    const request = {
      body: {
        username: 'admin',
        token: 'invalid-token'
      }
    } as any
    
    await controller.login(request, reply)

    expect(reply.status).toHaveBeenCalledWith(401)
    expect(reply.send).toHaveBeenCalledWith({
      success: false,
      message: 'Unauthorized',
    })
  })
})