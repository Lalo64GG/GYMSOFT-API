import { Request, Response } from "express";
import { UpdateGimnasioUseCase } from "../../../application/UpdateGimnasioUseCase";

export class UpdateGimnasioController {
  constructor(readonly updateGimnasiosUC: UpdateGimnasioUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const response = await this.updateGimnasiosUC.run(
        data.id,
        data.name,
        data.id_owner
      );
      if (response) {
        res.status(200).json({
          success: true,
          messages: "Recurso modificado con exito",
          data: response,
        });
      } else {
        res.status(409).json({
          success: false,
          error: "No se encontro ningun recurso con el id proporcionado",
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
