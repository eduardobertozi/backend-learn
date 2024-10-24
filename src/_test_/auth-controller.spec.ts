import { AuthController } from "@/controllers/auth.controller";
import { FastifyReply } from "fastify";
import { vi } from "vitest";

describe("AuthController", () => {
  let statusCode: number | undefined
  let responsePayload: any;

  const reply = {
    send: vi.fn((payload) => {
      responsePayload = payload
      return reply
    }),
    status: vi.fn((code) => {
      statusCode = code
      return reply
    })
  } as unknown as FastifyReply

  const authServiceMock = {
    authenticate: vi.fn()
  }

  beforeEach(() => {
    statusCode = undefined
    responsePayload = undefined
    vi.clearAllMocks()
  })

  it('Should authenticate with valid credentials', async () => {
    authServiceMock.authenticate.mockResolvedValue(true)
    
    const controller = new AuthController(authServiceMock)
    const request = {
      body: { username: 'validUser', password: 'validPassword' }
    } as any

    await controller.login(request, reply)

    expect(statusCode).toBeUndefined()
    expect(responsePayload).toEqual({
      success: true,
      message: 'Login successful',
      data: { user: 'validUser' }
    })
  })

  it('Should reject authentication with invalid token', async () => {
    authServiceMock.authenticate.mockResolvedValue(false)
    const controller = new AuthController(authServiceMock)
    const request = {
      body: { username: 'invalidUser', password: 'invalidPassword' }
    } as any

    await controller.login(request, reply)

    expect(statusCode).toBe(401)
    expect(responsePayload).toEqual({
      success: false,
      message: 'Unauthorized'
    })
  })
})