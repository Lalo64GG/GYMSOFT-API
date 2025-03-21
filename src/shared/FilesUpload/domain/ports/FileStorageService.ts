import { FileUpload } from "../entities/FileUpload";

export interface FileStorageService {
  saveFile(file: Express.Multer.File): Promise<FileUpload>;
  saveFiles(files: Express.Multer.File[]): Promise<FileUpload[]>;
  deleteFile(filename: string): Promise<boolean>;
  getFilePath(filename: string): string;
}