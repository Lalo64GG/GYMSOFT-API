import { User } from "../entity/User";

export interface UserRepository {
  createUser(user: User): Promise<User | null>;
  getAllUsers(id_gimnasio: number): Promise<User[] | null>;
  getUserById(id: number): Promise<User | null>;
  updateUser(user: User): Promise<User | null>;
  deleteUser(id: number): Promise<boolean>;
  auth(email: string, password: string): Promise<User | null>;
  getQR(id: number): Promise<User | null>;
}
