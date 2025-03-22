import { Request, Response } from "express";
import { Auth } from "../../../domain/entities/Auth";
import { CreateTokenUseCase } from "../../../application/CreateTokenUseCase";

export class CreateTokenControll {
  constructor(readonly createToken: CreateTokenUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const pyload: Auth["payload"] = {
        id: parseInt(res.locals.user.id),
        //id_outlet: parseInt(res.locals.user.id_outlet),
        rol: res.locals.user.rol,
        //id_gimnasio: parseInt(res.locals.user.id_gimnasio),
        email: res.locals.user.email
      };

      const token = await this.createToken.run(pyload);
      res
        .status(200)
        .header({ Authorization: `Bearer ${token}` })
        .json({
          data: res.locals.user,
          token: token,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
