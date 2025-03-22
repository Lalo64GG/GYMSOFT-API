import { Request, response, Response } from "express";
import { GetAllPlansUseCase } from "../../../application/GetAllPlansUseCase";

export class GetAllPlansController {
    constructor(readonly getAllUseCase: GetAllPlansUseCase) { }

    async run(req: Request, res: Response) {
        try {
            const plans = await this.getAllUseCase.run();
            if (typeof plans != "string") {
                if (plans.length == 0) {
                    res.status(404).json({
                        success: false,
                        messages: "No hay datos registrados",
                        data: plans,
                    });
                    return;
                }
                res.status(200).json({
                    success: true,
                    messages: "Recursos encontrados",
                    data: plans,
                });
            } else {
                response.status(409).json({
                    success: false,
                    error: plans,
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
