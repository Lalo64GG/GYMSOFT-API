import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/ports/UserRepository";

export class GetByIdUserUseCase {
  constructor(readonly repo: UserRepository) {}

  async run(id:number): Promise<User | null> {
    try {
      const users = await this.repo.getUserById(id);
      return users;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
