import { AuthController } from "@/controllers/auth.controller";
import { AuthService } from "@/services/auth.service";
import { FastifyReply } from "fastify";
import { vi } from "vitest";

describe("AuthController", () => {
  let statusCode: number | undefined;
  let responsePayload: any;

  const reply = {
    send: vi.fn((payload) => {
      responsePayload = payload;
      return reply;
    }),
    status: vi.fn((code) => {
      statusCode = code;
      return reply;
    }),
  } as unknown as FastifyReply;

  // Criando um mock explícito do authService com o método correto
  const authServiceMock = {
    authenticate: vi.fn(),
    generateToken: vi.fn().mockResolvedValue("mocked-token"), // Configurando como Promise resolvida
  }

  beforeEach(() => {
    statusCode = undefined;
    responsePayload = undefined;
    vi.clearAllMocks();
  });

  // it("Should authenticate and return a token for valid credentials", async () => {
  //   const user = { id: 1, username: "validUser", role: "user" };
    
  //   authServiceMock.authenticate.mockResolvedValue(user);
  //   authServiceMock.generateToken.mockResolvedValue("mocked-token");  // Garantindo que retorna "mocked-token"

  //   const controller = new AuthController(authServiceMock);
  //   const request = {
  //     body: { username: "validUser", password: "validPassword" },
  //   } as any;

  //   await controller.login(request, reply);

  //   expect(statusCode).toBeUndefined();
  //   expect(responsePayload).toEqual({
  //     success: true,
  //     message: "Login successful",
  //     data: { token: "mocked-token" },
  //   });
  //   expect(authServiceMock.authenticate).toHaveBeenCalledWith({
  //     username: "validUser",
  //     password: "validPassword",
  //   });
  //   expect(authServiceMock.generateToken).toHaveBeenCalledWith(user);
  // });

  it("Should reject authentication and return 401 for invalid credentials", async () => {
    authServiceMock.authenticate.mockResolvedValue(null);

    const controller = new AuthController(authServiceMock);
    const request = {
      body: { username: "invalidUser", password: "invalidPassword" },
    } as any;

    await controller.login(request, reply);

    expect(statusCode).toBe(401);
    expect(responsePayload).toEqual({
      success: false,
      message: "Unauthorized",
    });
    expect(authServiceMock.authenticate).toHaveBeenCalledWith({
      username: "invalidUser",
      password: "invalidPassword",
    });
    expect(authServiceMock.generateToken).not.toHaveBeenCalled();
  });
});
