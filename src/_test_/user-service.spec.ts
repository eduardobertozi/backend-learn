import { UserService } from '../services/user.service'

describe('UserService', () => {
  let userService: UserService

  beforeEach(() => {
    userService = new UserService()
  })

  it('Should return a user for valid credentials', async () => {
    const user = await userService.findUser('validUser', 'validPassword')

    expect(user).to.exist
    expect(user?.username).toEqual('validUser')
  })

  it('Should return null for invalid credentials', async () => {
    const user = await userService.findUser('invalidUser', 'invalidPassword')
    expect(user).toBeNull()
  })
})  