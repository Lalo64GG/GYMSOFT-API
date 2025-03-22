import { Request, Response } from "express";
import { GetByIdUserUseCase } from "../../../application/GetByIdUserUseCase";

export class GetByIdUserController {
  constructor(readonly getByIdUseCase: GetByIdUserUseCase) {}

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

      const user = await this.getByIdUseCase.run(idNum);

      if (!user) {
        return res.status(404).json({
          success: false,
          messages: "No se encontro el recurso solicitado",
          error: null,
        });
      }
      res.status(200).json({
        success: true,
        messages: "Recurso encontrado",
        data: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
