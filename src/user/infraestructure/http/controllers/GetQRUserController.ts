import { Request, Response } from "express";
import { GetQRUserUseCase } from "../../../application/GetQRUserUseCase";
import * as QRCode from "qrcode";

export class GetQRUserController {
  constructor(readonly getQRUseCase: GetQRUserUseCase) {}

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

      const user = await this.getQRUseCase.run(idNum);

      if (!user) {
        return res.status(404).json({
          success: false,
          messages: "No se encontro el recurso solicitado",
          error: null,
        });
      }
console.log(user);

      const qrData = {
        name: user.name,
        last_name: user.last_name,
        old: user.old,
        membership_status: user.membership_status,
        entrada:
          user.entrada === undefined || user.entrada === "00:00:00"
            ? "No registrado"
            : user.entrada,
        salida:
          user.salida === undefined || user.salida === "00:00:00"
            ? "No registrado"
            : user.salida,
      };

      const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));

      res.status(200).json({
        success: true,
        messages: "Recurso encontrado",
        data: qrCode,
        qrdata:qrData
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
