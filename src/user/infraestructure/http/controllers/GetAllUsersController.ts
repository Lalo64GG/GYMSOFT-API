import { GetAllUsersUseCase } from "../../../application/GetAllUsesUseCase";
import { Request, Response } from "express";

export class GetAllUsersController {
  constructor(readonly usecase: GetAllUsersUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const id = req.params.id_gimnasio;
      const idNum = parseInt(id);

      if (isNaN(idNum)) {
        return res.status(400).json({
          success: false,
          messages: "Request mal formulado",
          error: "ID inválido",
        });
      }
      const users = await this.usecase.run(idNum);
      if (users) {
        res.status(200).json({
          success: true,
          data: users,
          messages: "Recursos obtenidos con exito",
        });
      } else {
        return res.status(404).json({ success: false, error: users, message:"No se encontraron usuarios" });
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
