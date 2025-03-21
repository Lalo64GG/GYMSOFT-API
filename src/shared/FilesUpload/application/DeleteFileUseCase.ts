import { FileStorageService } from "../domain/ports/FileStorageService";

export class DeleteFileUseCase {
  constructor(readonly fileStorageService: FileStorageService) {}

  async execute(filename: string): Promise<boolean> {
    return await this.fileStorageService.deleteFile(filename);
  }
}