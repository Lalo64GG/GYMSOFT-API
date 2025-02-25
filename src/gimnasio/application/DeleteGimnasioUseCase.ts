import { IGimnasioRepository } from "../domain/ports/GimansioRepository";

export class DeleteGimnasioUseCase {
  constructor(readonly repositoryGimnasio: IGimnasioRepository) {}
  async run(id: number): Promise<Boolean> {
    try {
      const status = await this.repositoryGimnasio.delete(id);
      return status;
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }
}
