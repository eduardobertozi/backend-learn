import { Role } from "@/types"

export interface User {
  id?: string
  username: string
  password: string
  role: Role
}

export interface IUserRepository {
  findUser(username: string, password: string): Promise<User | null>
}