import { Request, Response } from "express";
import { AuthUserUseCase } from "../../../application/AuhtUserUseCase";

export class AuthUserController {
  constructor(readonly authUseCase: AuthUserUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data.email || !data.password) {
        res.status(400).json({
          success: true,
          messages: "Request mal formado, faltan datos"
        });
      }
      const user = await this.authUseCase.run(data.email, data.password);

      if (user) {
        res.status(200).json({
          success: true,
          messages: "Recurso encontrado",
          data: user,
        });
      } else {
        res.status(404).json({
          success: false,
          messages: "No se encontro el recurso solicitado",
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
