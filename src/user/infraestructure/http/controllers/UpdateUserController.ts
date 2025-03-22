import { UpdateUserUseCase } from "../../../application/UpdateUserUseCase";
import { Request, Response } from "express";
import { User } from "../../../domain/entity/User";

export class UpdateUserController {
  constructor(readonly updateUseCase: UpdateUserUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = new User(
        data.id,
        data.name,
        data.last_name,
        data.email,
        data.password,
        "",
        data.phone,
        data.sex,
        data.old,
        res.locals.URL,
        true,
        data.id_sucursal,
        data.id_actualPlan,
         "",
        ""
      );
      const newUser = await this.updateUseCase.run(user);
      if (newUser) {
        res.status(200).json({
          success: true,
          data: newUser,
          messages: "Recurso modificado con exito",
        });
      } else {
        return res
          .status(409)
          .json({ success: false, error: "Error en el proceso" });
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
