import { UpdatePlanUseCase } from "../../../application/UpdatePlanUseCase";
import { Request, Response } from "express";
import { Plan } from "../../../domain/entities/Plan";

export class UpdatePlanController {
    constructor(readonly updateUseCase: UpdatePlanUseCase) { }
    async run(req: Request, res: Response) {
        try {
            const data = req.body;
            const newPlan = await this.updateUseCase.run(
                data.id,
                data.name,
                data.cost,
                data.date,
                data.id_gimnasio
            );
            if (newPlan instanceof Plan) {
                const responseData = new Plan(
                    newPlan?.id,
                    newPlan?.name,
                    newPlan?.cost,
                    newPlan?.date,
                    newPlan?.id_gimnasio
                );
                res.status(201).json({
                    success: true,
                    data: responseData,
                    messages: "Recurso modificado con exito",
                });
            } else {
                return res.status(400).json({ success: false, error: newPlan });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: error,
            });
        }
    }
}