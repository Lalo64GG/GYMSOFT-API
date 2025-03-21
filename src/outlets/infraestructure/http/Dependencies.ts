import { OutletRepositoryMysql } from "../adapters/OutletRepositoryMysql";
import { CreateOutletUseCase } from "../../application/CreateOutletUseCase";
import { DeleteOutletUseCase } from "../../application/DeleteOutletUseCase";
import { GetAllOutletsUseCase } from "../../application/GetAllOutlestUseCase";
import { GetByIdOutletsUseCase } from "../../application/GetByIdOutletUseCase";
import { UpdateOutletUseCase } from "../../application/UpdateOutletUseCase";
import { CreateOutletController } from "./controllers/CrateOutletController";
import { DeleteOutletController } from "./controllers/DeleteOutletController";
import { GetAllOutletsController } from "./controllers/GetAllOutletsController";
import { GetByIdOutletController } from "./controllers/GetByIdOutletController";
import { UpdateOutletController } from "./controllers/UpdateOutletController";
import { database } from "../../../db/Database";

const dataSource = database.getDataSource();

const outletRepositoryMysql = new OutletRepositoryMysql(dataSource);

const createOutletUseCase = new CreateOutletUseCase(outletRepositoryMysql);
const deleteOutletUseCase = new DeleteOutletUseCase(outletRepositoryMysql);
const getAllOutletsUseCase = new GetAllOutletsUseCase(outletRepositoryMysql);
const getByIdOutletsUseCase = new GetByIdOutletsUseCase(outletRepositoryMysql);
const updateOutletUseCase = new UpdateOutletUseCase(outletRepositoryMysql);

export const createOutletController = new CreateOutletController(
  createOutletUseCase
);
export const deleteOutletController = new DeleteOutletController(
  deleteOutletUseCase
);
export const getAllOutletsController = new GetAllOutletsController(
  getAllOutletsUseCase
);
export const getByIdOutletController = new GetByIdOutletController(
  getByIdOutletsUseCase
);
export const updateOutletController = new UpdateOutletController(
  updateOutletUseCase
);
