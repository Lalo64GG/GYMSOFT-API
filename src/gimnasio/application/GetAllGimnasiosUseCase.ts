import { Gimnasio } from "../domain/entities/Gimnasio";
import { IGimnasioRepository } from "../domain/ports/GimansioRepository";

export class GetAllGimnasiosUseCase {
  constructor(readonly repositoryGimnasio: IGimnasioRepository) {}
  async run(): Promise<Gimnasio[]> {
    try {
      const gimnasios = await this.repositoryGimnasio.getAll();
      return gimnasios;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }
}
