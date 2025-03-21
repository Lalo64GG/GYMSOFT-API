import express from "express";
import {
    createPlanController,
    deletePlanController,
    getAllPlansController,
    getByIdPlanController,
    updatePlanController,
} from "../Dependencies";
import { validateTokenControll } from "../../../../shared/Auth/infraestructure/http/Dependencies";

export const planRouter = express.Router();

planRouter.post(
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
        createPlanController
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

planRouter.delete(
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
        deletePlanController
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

planRouter.get(
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
        getAllPlansController
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

planRouter.get(
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
        getByIdPlanController
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

planRouter.put(
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
        updatePlanController
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
