import { CreateGimnasioUseCase } from "../../application/CreateGimnasioUseCase";
import { DeleteGimnasioUseCase } from "../../application/DeleteGimnasioUseCase";
import { GetAllGimnasiosUseCase } from "../../application/GetAllGimnasiosUseCase";
import { GetByIdGimnasioUseCase } from "../../application/GetByIdGimnasioUseCase";
import { UpdateGimnasioUseCase } from "../../application/UpdateGimnasioUseCase";
import { CreateGimnasioController } from "./controllers/CreateGimnasioController";
import { DeleteGimnasioController } from "./controllers/DeleteGimnasioController";
import { GetAllGimnasiosController } from "./controllers/GetAllGimnasiosController";
import { GetByIdGimnasioController } from "./controllers/GetByIdGimnasioController";
import { UpdateGimnasioController } from "./controllers/UpdateGimnasioController";
import { GimnasioRepositoryMysql } from "../adapters/GimnasioRepositoryMysql";
import { database } from "../../../db/Database";

const dataSource = database.getDataSource();

const gimnasioRepository = new GimnasioRepositoryMysql(dataSource);

const createGimnasioUseCase = new CreateGimnasioUseCase(gimnasioRepository);
const deleteGimnasioUseCase = new DeleteGimnasioUseCase(gimnasioRepository);
const getAllGimnasiosUseCase = new GetAllGimnasiosUseCase(gimnasioRepository);
const getByIdGimnasioUseCase = new GetByIdGimnasioUseCase(gimnasioRepository);
const updateGimnasioUseCase = new UpdateGimnasioUseCase(gimnasioRepository);

export const createGimnasioController = new CreateGimnasioController(
  createGimnasioUseCase
);
export const deleteGimnasioController = new DeleteGimnasioController(
  deleteGimnasioUseCase
);
export const getAllGimnasiosController = new GetAllGimnasiosController(
  getAllGimnasiosUseCase
);
export const getByIdGimnasioController = new GetByIdGimnasioController(
  getByIdGimnasioUseCase
);
export const updateGimnasioController = new UpdateGimnasioController(
  updateGimnasioUseCase
);
