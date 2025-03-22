import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/ports/UserRepository";

export class GetQRUserUseCase {
  constructor(readonly repo: UserRepository) {}

  async run(id: number): Promise<User | null> {
    try {
      const users = await this.repo.getQR(id);
      return users;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
