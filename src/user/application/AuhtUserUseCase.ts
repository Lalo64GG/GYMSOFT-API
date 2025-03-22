import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/ports/UserRepository";
import { IEncrypt } from "./services/IEncript";

export class AuthUserUseCase {
  constructor(readonly repo: UserRepository, readonly encrypt: IEncrypt) {}

  async run(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.repo.auth(email, password);
      if (!user) {
        return null;
      }
      if (await this.encrypt.compareTo(password, user.password)) {
        return user;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
