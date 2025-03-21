import { CreatePlanUseCase } from "../../../application/CreatePlanUseCase";
import { Request, Response } from "express";
import { Plan } from "../../../domain/entities/Plan";

export class CreatePlanController {
    constructor(readonly createUseCase: CreatePlanUseCase) { }
    async run(req: Request, res: Response) {
        try {
            const data = req.body;
            const newPlan = await this.createUseCase.run(
                data.name,
                data.cost,
                data.date,
                data.id_gimnasio
            );
            if (newPlan instanceof Plan) {
                const responseData = {
                    id: newPlan?.id,
                    name: newPlan?.name,
                    cost: newPlan?.cost,
                    date: newPlan?.date,
                    id_gimnasio: newPlan?.id_gimnasio,
                };
                res.status(201).json({
                    success: true,
                    data: responseData,
                    messages: "Recurso creado con éxito",
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
