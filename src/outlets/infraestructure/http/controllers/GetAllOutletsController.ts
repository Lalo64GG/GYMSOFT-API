import { Request, response, Response } from "express";
import { GetAllOutletsUseCase } from "../../../application/GetAllOutlestUseCase";

export class GetAllOutletsController {
  constructor(readonly getAllUseCase: GetAllOutletsUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const outlets = await this.getAllUseCase.run();
      if (typeof outlets != "string") {
        if (outlets.length == 0) {
          res.status(409).json({
            messages: "No hay datos registrados",
            data: outlets,
          });
          return
        }
        res.status(200).json({
          messages: "Recursos encontrados",
          data: outlets,
        });
      } else {
        response.status(404).json({
          error: outlets,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: error,
      });
    }
  }
}
