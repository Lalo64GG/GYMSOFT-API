import express from "express";
import {
  createGimnasioController,
  deleteGimnasioController,
  getAllGimnasiosController,
  getByIdGimnasioController,
  updateGimnasioController,
} from "../Dependencies";

export const gimnasioRouter = express.Router();

gimnasioRouter.post("/", (req, res, next) => {
  createGimnasioController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return next(err);
    });
});

gimnasioRouter.delete("/:id", (req, res, next) => {
  deleteGimnasioController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return next(err);
    });
});

gimnasioRouter.get("/", (req, res, next) => {
  getAllGimnasiosController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return next(err);
    });
});

gimnasioRouter.get("/:id", (req, res, next) => {
  getByIdGimnasioController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return next(err);
    });
});

gimnasioRouter.put("/", (req, res, next) => {
  updateGimnasioController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return next(err);
    });
});
