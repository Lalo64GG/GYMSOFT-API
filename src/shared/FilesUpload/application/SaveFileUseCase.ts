import { FileUpload } from "../domain/entities/FileUpload";
import { FileStorageService } from "../domain/ports/FileStorageService";

export class SaveFileUseCase {
  constructor(readonly fileStorageService: FileStorageService) {}

  async execute(file: Express.Multer.File): Promise<FileUpload> {
    return await this.fileStorageService.saveFile(file);
  }
}
