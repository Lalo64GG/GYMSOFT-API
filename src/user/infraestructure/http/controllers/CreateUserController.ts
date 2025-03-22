import { Request, Response } from "express";
import { User } from "../../../domain/entity/User";
import { CreateUserUseCase } from "../../../application/CreateUserUseCase";

export class CreateUserController {
  constructor(readonly usecase: CreateUserUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const user = new User(
        0,
        data.name,
        data.last_name,
        data.email,
        data.password,
        "",
        data.phone,
        data.sex,
        data.year_old,
        res.locals.URL,
        true,
        data.id_sucursal,
        data.id_actualPlan,
        "",
        ""
      );
      const result = await this.usecase.run(user);
      if (result) {
        res.status(201).json({
          status: true,
          data: result,
        });
      } else {
        res.status(400).json({
          status: false,
          error: "fallo la peticion por parte del cliente",
        });
      }
    } catch (error) {
        res.status(500).json({
          status: false,
          error: error,
        });
    }
  }
}
