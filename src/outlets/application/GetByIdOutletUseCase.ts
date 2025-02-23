import { Outlet } from "../domain/entities/Outlet";
import { IOutletRepository } from "../domain/ports/OutletRepository";

export class GetByIdOutletsUseCase {
  constructor(readonly repositoryOutlet: IOutletRepository) {}
  async run(id: number): Promise<Outlet | string> {
    try {
      const outlet =await this.repositoryOutlet.getById(id);
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
