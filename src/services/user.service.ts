import { User, UserRepository } from "@/interfaces/user";

export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  async findUser(username: string, password: string): Promise<User | null> {
    return this.userRepository.findUser(username, password)
  }
}