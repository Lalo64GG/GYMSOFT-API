import { CreateOutletUseCase } from "../../../application/CreateOutletUseCase";
import { Request, Response } from "express";
import { Outlet } from "../../../domain/entities/Outlet";

export class CreateOutletController {
  constructor(readonly createUseCase: CreateOutletUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const newOutlet = await this.createUseCase.run(
        data.name,
        data.address,
        data.id_owner,
        data.id_gimnasio
      );
      if (newOutlet instanceof Outlet) {
        const responseData = {
          id: newOutlet?.id,
          name: newOutlet?.name,
          address: newOutlet?.address,
          id_owner: newOutlet?.id_owner,
          id_gimnasio: newOutlet?.id_gimnasio,
        };
        res.status(201).json({
          data: responseData,
          messages: "Recurso creado con exito",
        });
      } else {
        return res.status(400).json({ error: newOutlet });
      }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error:error
        })
    }
  }
}
