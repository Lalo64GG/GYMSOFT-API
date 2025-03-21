import { Request, Response } from "express";
import { DeleteGimnasioUseCase } from "../../../application/DeleteGimnasioUseCase";

export class DeleteGimnasioController {
  constructor(readonly deleteGimnasioUC: DeleteGimnasioUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const id = req.params.id;
      console.log(id);
      
      const idNum = parseInt(id);

      if (isNaN(idNum)) {
        return res.status(400).json({
          success: false,
          messages: "Request mal formulado",
          error: "ID inválido",
        });
      }

      const status = await this.deleteGimnasioUC.run(idNum);
      if (status) {
        res.status(200).json({
          success: true,
          messages: "Recurso eliminado con exito",
        });
      } else {
        res.status(409).json({
          success: false,
          error: "No se encontro el recurso a eliminar",
        });
      }
    } catch (error) {
      return res.status(500).json({
        succes: false,
        error: error,
        messages: "Error en el servidor",
      });
    }
  }
}
