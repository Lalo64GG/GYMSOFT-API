import { Request, Response } from "express";
import { DeletePlanUseCase } from "../../../application/DeletePlanUseCase";

export class DeletePlanController {
    constructor(readonly deleteUseCase: DeletePlanUseCase) { }
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

            const status = await this.deleteUseCase.run(idNum);
            if (typeof status == "boolean" && status == true) {
                res.status(200).json({
                    success: true,
                    messages: "Recurso eliminado con exito",
                });
            } else if (typeof status == "boolean" && status == true) {
                res.status(404).json({
                    success: false,
                    messages: "No se encontro el recurso con el id proporcionado",
                    error: status,
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: status,
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
