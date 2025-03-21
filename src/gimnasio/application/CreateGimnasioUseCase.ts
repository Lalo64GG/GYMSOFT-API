import { Gimnasio } from "../domain/entities/Gimnasio";
import { IGimnasioRepository } from "../domain/ports/GimansioRepository";

export class CreateGimnasioUseCase {
  constructor(readonly repositoryGimnasio: IGimnasioRepository) {}
  async run(name: String, id_owner: number): Promise<Gimnasio> {
    try {
      const gimnasio = await this.repositoryGimnasio.create(name, id_owner);
      return gimnasio;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }
}
