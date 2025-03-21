import multer, { StorageEngine, Multer } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { MulterOptions } from "../../../../config/multer";

export class MulterService {
  private upload: Multer;
  private storage: StorageEngine;
  private uploadDir: string;

  constructor( multerOptions: typeof MulterOptions) {
    this.uploadDir = multerOptions.uploadDir;
    
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
      fs.mkdirSync(path.join(this.uploadDir, "fotos_usuarios"), {
        recursive: true,
      });
     fs.mkdirSync(path.join(this.uploadDir, "rutinas"), {
       recursive: true,
     });
    }

    this.storage = multer.diskStorage({
      destination: (req: Request, file: Express.Multer.File, cb) => {
        if (file.mimetype.includes("image")) {
          cb(null, path.join(this.uploadDir, "fotos_usuarios"));
        } else {
          cb(null, path.join(this.uploadDir, "rutinas"));
        }
      },
      filename: (req: Request, file: Express.Multer.File, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
        const ext = path.extname(file.originalname);
        
        cb(null, file.originalname.split(".")[0] + "-" + uniqueSuffix + ext);
      },
    });

    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize: multerOptions.fileSize,
      },
      fileFilter: (req, file, cb) => {
        if (multerOptions.allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(
            new Error(
              `Solo se permiten los tipos de archivo: ${multerOptions.allowedMimeTypes.join(
                ", "
              )}`
            )
          );
        }
      },
    });
  }

  getSingleFileMiddleware(fieldName: string ): any {
    return this.upload.single(fieldName);
  }

  getMultipleFilesMiddleware(
    fieldName: string = "files",
    maxCount: number = 5
  ): any {
    return this.upload.array(fieldName, maxCount);
  }

  getUploadDir(): string {
    return this.uploadDir;
  }
}
