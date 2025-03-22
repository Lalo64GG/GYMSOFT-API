import { FileUpload } from "../domain/entities/FileUpload";
import { FileStorageService } from "../domain/ports/FileStorageService";

export class SaveFilesUseCase {
  constructor(readonly fileStorageService: FileStorageService) {}

  async execute(files: Express.Multer.File[]): Promise<FileUpload[]> {
const data = await this.fileStorageService.saveFiles(files);


    return data
  }
}
