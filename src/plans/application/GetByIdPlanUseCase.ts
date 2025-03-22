import { Plan } from "../domain/entities/Plan";
import { IPlanRepository } from "../domain/ports/PlanRepository";

export class GetByIdPlanUseCase {
    constructor(readonly planRepository: IPlanRepository) { }
    async run(id: number): Promise<Plan | string> {
        try {
            const plan = await this.planRepository.getById(id);
            if (typeof plan != "string") {
                return plan;
            } else {
                return plan;
            }
        } catch (error) {
            console.log(error);
            return "error: " + error;
        }
    }
}