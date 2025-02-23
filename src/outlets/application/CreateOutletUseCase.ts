import { Outlet } from "../domain/entities/Outlet";
import { IOutletRepository } from "../domain/ports/OutletRepository";

export class CreateOutletUseCase {
  constructor(readonly IOutletRepository: IOutletRepository) {}

  async run(
    name: String,
    address: String,
    id_owner: number,
    id_gimnasio: number
  ): Promise<Outlet | string> {
    try {
      const newOutlet = await this.IOutletRepository.create(
        name,
        address,
        id_owner,
        id_gimnasio
      );
      if (typeof newOutlet != "string") {
        return newOutlet;
      } else {
        return newOutlet;
      }
    } catch (error) {
      console.log(error);
      return "error: " + error;
    }
  }
}
