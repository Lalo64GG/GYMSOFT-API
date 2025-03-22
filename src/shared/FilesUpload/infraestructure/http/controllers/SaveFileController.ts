import { NextFunction, Request, Response } from "express";
import { SaveFileUseCase } from "../../../application/SaveFileUseCase";
import { MulterService } from "../../adapters/MulterService";
import { MulterOptions } from "../../../../../config/multer";

export class SaveFileController {
  private fileStorageService: MulterService;
  constructor(readonly saveFileUseCase: SaveFileUseCase) {
    this.fileStorageService = new MulterService(MulterOptions);
  }

  getSingleUploadMiddleware() {
    return this.fileStorageService.getSingleFileMiddleware("file");
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ error: "No se proporcionó ningún archivo" });
      }

      const fileInfo = await this.saveFileUseCase.execute(req.file);
      const relativePath = fileInfo.path
        .substring(fileInfo.path.indexOf("uploads"))
        .replace(/\\/g, "/");
      res.locals.URL = relativePath;
      /*res.status(201).json({
        status:"success",
        data: fileInfo
      })*/
      next();
    } catch (error) {
      console.error("Error en la subida:", error);
      return res.status(500).json({ error: "Error al procesar el archivo" });
    }
  }
}
