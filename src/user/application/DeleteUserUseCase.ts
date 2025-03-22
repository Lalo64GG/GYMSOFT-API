import { UserRepository } from "../domain/ports/UserRepository";

export class DeleteUserUseCase {
  constructor(readonly repo: UserRepository) {}

  async run(id: number): Promise<boolean> {
    try {
      const status = await this.repo.deleteUser(id);
      return status;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
