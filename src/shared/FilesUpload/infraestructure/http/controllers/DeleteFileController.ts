import { Request, Response } from "express";
import { DeleteFileUseCase } from "../../../application/DeleteFileUseCase";

export class DeleteFileControll {
  constructor(readonly deleteFileUseCase: DeleteFileUseCase) {}
  async execute(req: Request, res: Response) {
    try {
      const { filename } = req.params;
      if (!filename) {
        return res.status(400).json({ error: "Filename is required" });
      }

      const result = await this.deleteFileUseCase.execute(filename);

      if (result) {
        return res.status(200).json({
          success: true,
          message: "File deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "File not found or could not be deleted",
        });
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      return res.status(500).json({ error: "Failed to delete file" });
    }
  }
}
