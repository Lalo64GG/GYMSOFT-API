import { Request, Response } from "express";
import { GetByIdGimnasioUseCase } from "../../../application/GetByIdGimnasioUseCase";

export class GetByIdGimnasioController {
  constructor(readonly getByIdGimnasiosUC: GetByIdGimnasioUseCase) {}
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

      const gimnasio = await this.getByIdGimnasiosUC.run(idNum);
      if (gimnasio) {
        res.status(200).json({
          success: true,
          messages: "Recursos obtenidos con exito",
          data: gimnasio,
        });
      } else {
        res.status(409).json({
          success: false,
          error: "No se encontro ningun recurso con el id proporcionado",
        });
      }
    } catch (error) {
      console.error(error);
      
      return res.status(500).json({
        succes: false,
        error: error,
        messages: "Error en el servidor",
      });
    }
  }
}
