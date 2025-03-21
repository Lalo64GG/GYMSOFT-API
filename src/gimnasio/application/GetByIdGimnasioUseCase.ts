import { Gimnasio } from "../domain/entities/Gimnasio";
import { IGimnasioRepository } from "../domain/ports/GimansioRepository";

export class GetByIdGimnasioUseCase {
  constructor(readonly repositoryGimnasio: IGimnasioRepository) {}
  async run(id: number): Promise<Gimnasio> {
    try {
      const gimnasios = await this.repositoryGimnasio.getById(id);
      return gimnasios;
    } catch (error) {
      console.error(error);
      
      throw new Error("Error: " + error);
    }
  }
}
