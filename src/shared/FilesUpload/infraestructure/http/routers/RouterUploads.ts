import express from "express";
import { saveFileController, deleteFileController } from "../Dependencies";

export const routerUpload = express.Router();

routerUpload.post(
  "/upload",
  saveFileController.getSingleUploadMiddleware(),
  async (req, res, next) => {
    console.log(req.file);
    saveFileController
      .execute(req, res, next)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
);

routerUpload.delete("/:filename", async (req, res) => {
  deleteFileController
    .execute(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
});
