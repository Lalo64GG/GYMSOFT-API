import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/ports/UserRepository";

export class UpdateUserUseCase {
  constructor(readonly repo: UserRepository) {}

  async run(user:User): Promise<User | null> {
    try {
      const newUser = await this.repo.updateUser(user);
      return newUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
