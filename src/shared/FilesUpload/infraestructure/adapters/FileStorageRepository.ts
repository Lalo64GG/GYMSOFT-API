import { FileUpload } from "../../domain/entities/FileUpload";
import { FileStorageService } from "../../domain/ports/FileStorageService";
import { MulterService } from "./MulterService";
import path from "path";
import fs from "fs";

export class FileStorageRepository implements FileStorageService {
  private multerService: MulterService;
  private uploadDir: string;

  constructor(multerService: MulterService) {
    this.multerService = multerService;
    this.uploadDir = multerService.getUploadDir();
  }

  getSingleFileMiddleware(fieldName: string = "file"): any {
    return this.multerService.getSingleFileMiddleware(fieldName);
  }

  getMultipleFilesMiddleware(
    fieldName: string = "files",
    maxCount: number = 5
  ): any {
    return this.multerService.getMultipleFilesMiddleware(fieldName, maxCount);
  }

  async saveFile(file: Express.Multer.File): Promise<FileUpload> {
    console.log("llego repo");
    return {
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
      destination: file.destination,
    };
  }

  async saveFiles(files: Express.Multer.File[]): Promise<FileUpload[]> {
    return files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
      destination: file.destination,
    }));
  }

  async deleteFile(filename: string): Promise<boolean> {
    try {
      let filePath = "";
      if (filename.includes("pdf")) {
        filePath = path.join(this.uploadDir,"rutinas", filename);
      } else {
        filePath = path.join(this.uploadDir, "fotos_usuarios", filename);
      }

      console.log(filePath);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  getFilePath(filename: string): string {
    return path.join(this.uploadDir, filename);
  }
}
