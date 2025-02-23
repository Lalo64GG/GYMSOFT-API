import { Outlet } from "../domain/entities/Outlet";
import { IOutletRepository } from "../domain/ports/OutletRepository";

export class GetAllOutletsUseCase {
  constructor(readonly repositoryOutlet: IOutletRepository) {}
  async run(): Promise<Outlet[] | string> {
    try {
      const outlets = await this.repositoryOutlet.getAll();
      if (typeof outlets != "string") {
        return outlets;
      } else {
        return outlets;
      }
    } catch (error) {
      console.log(error);
      return "error: " + error;
    }
  }
}
