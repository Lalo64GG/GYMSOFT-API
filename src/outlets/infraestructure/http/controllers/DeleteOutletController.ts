import { Request, Response } from "express";
import { DeleteOutletUseCase } from "../../../application/DeleteOutletUseCase";

export class DeleteOutletController {
  constructor(readonly deleteUseCase: DeleteOutletUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const idNum = parseInt(id);

      if (isNaN(idNum)) {
        return res.status(400).json({
          messages: "Request mal formulado",
          error: "ID inválido",
        });
      }

      const status = await this.deleteUseCase.run(idNum);
      if (typeof status == "boolean" && status == true) {
        res.status(200).json({
          messages: "Recurso eliminado con exito",
        });
      } else {
        res.status(404).json({
          error: status,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
