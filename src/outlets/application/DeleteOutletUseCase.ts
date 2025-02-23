import { IOutletRepository } from "../domain/ports/OutletRepository";

export class DeleteOutletUseCase {
  constructor(readonly repositoryOutlet: IOutletRepository) {}
  async run(id: number): Promise<Boolean | string> {
    try {
      const status = await this.repositoryOutlet.delete(id);
      if (typeof status != "string") {
        return status;
      } else {
        return status;
      }
    } catch (error) {
      console.log(error);
      return "error: " + error;
    }
  }
}
