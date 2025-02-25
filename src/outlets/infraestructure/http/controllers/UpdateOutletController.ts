import { UpdateOutletUseCase } from "../../../application/UpdateOutletUseCase";
import { Request, Response } from "express";
import { Outlet } from "../../../domain/entities/Outlet";

export class UpdateOutletController {
  constructor(readonly updateUseCase: UpdateOutletUseCase) {}
  async run(req: Request, res: Response) {
    try {
      const data = req.body;
      const newOutlet = await this.updateUseCase.run(
        data.id,
        data.name,
        data.address,
        data.id_owner,
        data.id_gimnasio
      );
      if (newOutlet instanceof Outlet) {
        const responseData = new Outlet(
          newOutlet?.id,
          newOutlet?.name,
          newOutlet?.address,
          newOutlet?.id_owner,
          newOutlet?.id_gimnasio
        );
        res.status(201).json({
          success: true,
          data: responseData,
          messages: "Recurso modificado con exito",
        });
      } else {
        return res.status(400).json({ success: false, error: newOutlet });
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
