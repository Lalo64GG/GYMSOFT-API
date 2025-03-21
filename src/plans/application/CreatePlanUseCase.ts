import { Plan } from "../domain/entities/Plan";
import { IPlanRepository } from "../domain/ports/PlanRepository";

export class CreatePlanUseCase {
  constructor(readonly planRepository: IPlanRepository) { }

  async run(
    name: String,
    cost: number,
    date: String,
    id_gimnasio: number
  ): Promise<Plan | string> {
    try {
      const newPlan = await this.planRepository.create(
        name,
        cost,
        date,
        id_gimnasio
      );
      if (typeof newPlan != "string") {
        return newPlan;
      } else {
        return newPlan;
      }
    } catch (error) {
      console.log(error);
      return "error: " + error;
    }
  }
}
