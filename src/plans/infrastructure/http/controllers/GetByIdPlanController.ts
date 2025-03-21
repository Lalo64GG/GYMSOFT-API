import { Request, Response } from "express";
import { GetByIdPlanUseCase } from "../../../application/GetByIdPlanUseCase";
import { Plan } from "../../../domain/entities/Plan";

export class GetByIdPlanController {
    constructor(readonly getByIdUseCase: GetByIdPlanUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const idNum = parseInt(id);

            if (isNaN(idNum)) {
                return res.status(400).json({
                    success: false,
                    messages: "Request mal formulado",
                    error: "ID inválido",
                });
            }

            const plan = await this.getByIdUseCase.run(idNum);

            if (plan instanceof Plan) {
                res.status(200).json({
                    success: true,
                    messages: "Recurso encontrado",
                    data: plan,
                });
            } else {
                res.status(404).json({
                    success: false,
                    messages: "No se encontro el recurso solicitado",
                    error: plan,
                });
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