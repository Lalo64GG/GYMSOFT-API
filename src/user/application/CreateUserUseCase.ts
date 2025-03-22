import { User } from "../domain/entity/User";
import { UserRepository } from "../domain/ports/UserRepository";
import { IEncrypt } from "./services/IEncript";

export class CreateUserUseCase {
  constructor(readonly repo: UserRepository, readonly encrypt: IEncrypt) {}

  async run(user: User): Promise<User | null> {
    try {
      const passNew = await this.encrypt.encodePassword(user.password);
      user = new User(
        user.id,
        user.name,
        user.last_name,
        user.email,
        passNew,
        user.input_token,
        user.phone,
        user.sex,
        user.old,
        user.photo,
        user.membership_status,
        user.id_sucursal,
        user.id_actualPlan,
        "",
        ""
      );
      
      const userNew = await this.repo.createUser(user);
      return userNew;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
