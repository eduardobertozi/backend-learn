import { AuthServiceFactory } from "@/factories/auth-service.factory"
import { AuthService } from "@/services/auth.service"

describe('AuthService', () => {
  let authService: AuthService

  beforeEach(() => {
    authService = AuthServiceFactory.create()
  })

  it('Should return a token for valid credentials', async () => {
    const token = await authService.authenticate({ 
      username: 'validUser', 
      password: 'validPassword' 
    })

    expect(token).to.exist
  })

  it('Should throw error for invalid credentials', async () => {
    try {
      await authService.authenticate({ 
        username: 'validUser', 
        password: 'validPassword' 
      })
    } catch(error) {
      expect((error as Error).message).to.equal('Invalid credentials')
    }
  })
})