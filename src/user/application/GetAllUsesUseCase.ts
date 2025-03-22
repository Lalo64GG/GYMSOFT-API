import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/ports/UserRepository";

export class GetAllUsersUseCase {
  constructor(readonly repo: UserRepository) {}

  async run(id_gimnasio:number): Promise<User[] | null> {
    try {
      const users = await this.repo.getAllUsers(id_gimnasio);
      return users;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
