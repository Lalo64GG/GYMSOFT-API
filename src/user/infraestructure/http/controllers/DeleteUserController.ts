import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../../application/DeleteUserUseCase";

export class DeleteUserController {
  constructor(readonly deleteUseCase: DeleteUserUseCase) {}

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

      const user = await this.deleteUseCase.run(idNum);

      if (user) {
        res.status(200).json({
          success: true,
          messages: "Recurso eliminado",
        });
      } else {
        res.status(404).json({
          success: false,
          messages: "No se encontro el recurso a eliminar",
          error: user,
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
