import { Request, Response } from "express";
import { CreateGimnasioUseCase } from "../../../application/CreateGimnasioUseCase";

export class CreateGimnasioController {
  constructor(readonly createGimnasioUC: CreateGimnasioUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const gimnasio = await this.createGimnasioUC.run(
        data.name,
        data.id_owner
      );
      if (gimnasio) {
        res.status(201).json({
          success: true,
          messages: "Recurso creado",
          data: gimnasio,
        });
        return;
      } else {
        res.status(404).json({
          success: false,
          error: "hubo un problema en la petición: " + gimnasio,
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
