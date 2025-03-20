import { Plan } from "../domain/entities/Plan";
import { IPlanRepository } from "../domain/ports/PlanRepository";

export class GetAllPlansUseCase {
    constructor(readonly planRepository: IPlanRepository) { }
    async run(): Promise<Plan[] | string> {
        try {
            const plans = await this.planRepository.getAll();
            if (typeof plans != "string") {
                return plans;
            } else {
                return plans;
            }
        } catch (error) {
            console.log(error);
            return "error: " + error;
        }
    }
}
