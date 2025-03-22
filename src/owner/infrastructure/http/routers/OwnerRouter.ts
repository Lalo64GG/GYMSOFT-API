import express from "express";
import {
    loginController,
    registerController,
} from "../Dependencies";

export const ownerRouter = express.Router();

ownerRouter.post(
    "/register",
    (req, res) => {
        registerController
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

ownerRouter.post(
    "/login",
    (req, res) => {
        loginController
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