import { DeleteFileUseCase } from "../../application/DeleteFileUseCase";
import { SaveFileUseCase } from "../../application/SaveFileUseCase";
import { SaveFilesUseCase } from "../../application/SaveFilesUseCase";
import { SaveFileController } from "./controllers/SaveFileController";
import { FileStorageRepository } from "../adapters/FileStorageRepository";
import { MulterService } from "../adapters/MulterService";
import { MulterOptions } from "../../../../config/multer";
import { DeleteFileControll } from "./controllers/DeleteFileController";

const options = MulterOptions;
const multerService = new MulterService(options);
const repository = new FileStorageRepository(multerService);

const deleteFileUseCase = new DeleteFileUseCase(repository)
const saveFileUseCase = new SaveFileUseCase(repository);

export const deleteFileController = new DeleteFileControll(deleteFileUseCase)
export const saveFileController = new SaveFileController(saveFileUseCase);
