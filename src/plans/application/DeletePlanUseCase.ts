import { IPlanRepository } from "../domain/ports/PlanRepository";

export class DeletePlanUseCase {
  constructor(readonly planRepository: IPlanRepository) { }
  async run(id: number): Promise<Boolean | string> {
    try {
      const status = await this.planRepository.delete(id);
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