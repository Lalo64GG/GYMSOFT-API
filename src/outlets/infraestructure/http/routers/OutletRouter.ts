import express from "express";
import {
  createOutletController,
  deleteOutletController,
  getAllOutletsController,
  getByIdOutletController,
  updateOutletController,
} from "../Dependencies";
import { validateTokenControll } from "../../../../shared/Auth/infraestructure/http/Dependencies";

export const outletRouter = express.Router();

outletRouter.post(
  "/",
  (req, res, next) => {
    validateTokenControll
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    createOutletController
      .run(req, res)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

outletRouter.delete(
  "/:id",
  (req, res, next) => {
    validateTokenControll
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    deleteOutletController
      .run(req, res)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

outletRouter.get(
  "/",
  (req, res, next) => {
    validateTokenControll
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getAllOutletsController
      .run(req, res)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

outletRouter.get(
  "/:id",
  (req, res, next) => {
    validateTokenControll
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    getByIdOutletController
      .run(req, res)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);

outletRouter.put(
  "/",
  (req, res, next) => {
    validateTokenControll
      .run(req, res, next)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  },
  (req, res) => {
    updateOutletController
      .run(req, res)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        res
          .status(500)
          .send({ error: err.message, msg: "Error en el servidor" });
      });
  }
);
