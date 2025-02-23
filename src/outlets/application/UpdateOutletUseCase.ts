import { Outlet } from "../domain/entities/Outlet";
import { IOutletRepository } from "../domain/ports/OutletRepository";

export class UpdateOutletUseCase {
  constructor(readonly repositoryOutlet: IOutletRepository) {}
  async run(
    id: number,
    name: String,
    address: String,
    id_owner: number,
    id_gimnasio: number
  ): Promise<Outlet | string> {
    try {
      const outlet = await this.repositoryOutlet.update(
        id,
        name,
        address,
        id_owner,
        id_gimnasio
      );
      if (typeof outlet != "string") {
        return outlet;
      } else {
        return outlet;
      }
    } catch (error) {
      console.log(error);
      return "error: " + error;
    }
  }
}
