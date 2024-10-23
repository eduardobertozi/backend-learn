import { User, IUserRepository } from "@/interfaces/user";

export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [
    { username: 'validUser', password: 'validPassword', role: 'user' },
    { username: 'adminUser', password: 'adminPassword', role: 'admin' },
  ]

  async findUser(username: string, password: string): Promise<User | null> {
    const user = this.users
      .find((user) => user.username === username && user.password === password)
      
    return user ? user : null
  }
}