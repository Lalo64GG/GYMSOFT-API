import { Request, Response } from "express";
import { GetAllGimnasiosUseCase } from "../../../application/GetAllGimnasiosUseCase";

export class GetAllGimnasiosController {
  constructor(readonly getAllGimnasiosUC: GetAllGimnasiosUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const gimnasios = await this.getAllGimnasiosUC.run();
      console.log(gimnasios);
      if (gimnasios.length > 0) {
        res.status(200).json({
          success: true,
          messages: "Recursos obtenidos con exito",
          data: gimnasios,
        });
      } else {
        res.status(409).json({
          success: false,
          error: "No se encontro ningun recurso",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        succes: false,
        error: error,
        messages: "Error en el servidor",
      });
    }
  }
}
