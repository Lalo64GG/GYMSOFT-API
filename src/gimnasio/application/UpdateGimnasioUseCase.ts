import { Gimnasio } from "../domain/entities/Gimnasio";
import { IGimnasioRepository } from "../domain/ports/GimansioRepository";

export class UpdateGimnasioUseCase {
  constructor(readonly repositoryGimnasio: IGimnasioRepository) {}
  async run(id:number,name: String, id_owner: number): Promise<Gimnasio> {
    try {
      const gimnasio = await this.repositoryGimnasio.update(id, name, id_owner);
      return gimnasio;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }
}
