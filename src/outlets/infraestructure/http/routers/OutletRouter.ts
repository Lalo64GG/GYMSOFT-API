import express from "express";
import {
  createOutletController,
  deleteOutletController,
  getAllOutletsController,
  getByIdOutletController,
  updateOutletController,
} from "../Dependencies";

export const outletRouter = express.Router();

outletRouter.post("/", (req, res) => {
  createOutletController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

outletRouter.delete("/:id", (req, res) => {
  deleteOutletController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

outletRouter.get(
  "/",
  getAllOutletsController.run.bind(getAllOutletsController)
);

outletRouter.get("/:id", (req, res) => {
  getByIdOutletController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

outletRouter.put("/", (req, res) => {
  updateOutletController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});
