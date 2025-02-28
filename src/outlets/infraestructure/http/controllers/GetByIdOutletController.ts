import { Request, Response } from "express";
import { GetByIdOutletsUseCase } from "../../../application/GetByIdOutletUseCase";
import { Outlet } from "../../../domain/entities/Outlet";

export class GetByIdOutletController {
  constructor(readonly getByIdUseCase: GetByIdOutletsUseCase) {}

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

      const outlet = await this.getByIdUseCase.run(idNum);

      if (outlet instanceof Outlet) {
        res.status(200).json({
          success: true,
          messages: "Recurso encontrado",
          data: outlet,
        });
      } else {
        res.status(404).json({
          success: false,
          messages: "No se encontro el recurso solicitado",
          error: outlet,
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
