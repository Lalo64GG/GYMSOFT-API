import { Plan } from "../domain/entities/Plan";
import { IPlanRepository } from "../domain/ports/PlanRepository";

export class UpdatePlanUseCase {
    constructor(readonly planRepository: IPlanRepository) { }
    async run(
        id: number,
        name: String,
        cost: number,
        date: String,
        id_gimnasio: number
    ): Promise<Plan | string> {
        try {
            const outlet = await this.planRepository.update(
                id,
                name,
                cost,
                date,
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