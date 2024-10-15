import { AuthService } from "../services/auth.service";
import { TokenAuthService } from "../services/token-auth.service";

describe('Testing LSP principle for Auth Services', () => {
  it("AuthService should authenticate valid credentials", async () => {
    const service = new AuthService()
    const result = await service.authenticate({ username: 'admin', password: 'admin' })
    expect(result).toBe(true)
  })

  it("TokenAuthService should authenticate valid token", async () => {
    const service = new TokenAuthService()
    const result = await service.authenticate({ username: "admin", token: 'valid-token' })
    expect(result).toBe(true)
  })
})