import { User } from "../entity/User";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User>;
  updateUser(user: User): Promise<User>;
  deleteUser(id: number): Promise<boolean>;
}