import { Auth } from "../domain/entities/Auth";
import { IAuthRepository } from "../domain/ports/AuthRepository";

export class CreateTokenUseCase {
  constructor(readonly repositoryAuth: IAuthRepository) { }
  async run(pyload: Auth["payload"]): Promise<string> {
    try {
      const token = await this.repositoryAuth.createToken(pyload);
      return token;
    } catch (error) {
      console.error(error);
      return "Error: " + error;
    }
  }
}
