import { Request, Response, NextFunction } from "express";
import { ValidateTokenUseCase } from "../../../application/ValidateTokenUseCase";

export class ValidateTokenControll {
  constructor(readonly validateToken: ValidateTokenUseCase) {}

  async run(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
          .status(401)
          .json({ msg: "No autorizado: Token no encontrado o inválido" });
      }

      const token = authHeader.split(" ")[1];

      if (!token || token.length < 2) {
        return res.status(400).json({ msg: "No se encontró el token" });
      }

      let access;
      try {
        access = await this.validateToken.run(token);
        console.log(access);
      } catch (error) {
        console.error("Error al validar el token:", error);
        return res
          .status(500)
          .json({ msg: "Error interno del servidor al validar el token" });
      }

      if (access === true) {
        return next();
      }

      if (typeof access === "string" && access.split(".").length === 3) {
        res.locals.newToken = access;
        return next();
      }

      return res
        .status(401)
        .json({ msg: "Acceso denegado, token inválido", erro: access });
    } catch (error) {
      console.error("Error en ValidateTokenControll:", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  }
}
