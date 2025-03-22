import express from "express";
import { validateTokenControll } from "../../../../shared/Auth/infraestructure/http/Dependencies";
import { saveFileController } from "../../../../shared/FilesUpload/infraestructure/http/Dependencies";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getByIdUserController,
  updateUserController,
  authUserController,
  getQRUserController
} from "../Dependencies";


export const userRouter = express.Router();

userRouter.post(
  "/",
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
  },
  (req, res, next) => {
    createUserController
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

userRouter.post("/login", (req, res) => {
  authUserController
    .run(req, res)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.status(500).send({ error: err.message, msg: "Error en el servidor" });
    });
});

userRouter.delete(
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
    deleteUserController
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

userRouter.get(
  "/:id_gimnasio",
  
  (req, res) => {
    getAllUsersController
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

userRouter.get(
  "/byid/:id",
  
  (req, res) => {
    getByIdUserController
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

userRouter.get(
  "/qr/:id",

  (req, res) => {
    getQRUserController
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

userRouter.put(
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
    updateUserController
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
