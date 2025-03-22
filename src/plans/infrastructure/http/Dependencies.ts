import { PlanRepositoryMysql } from "../adapters/PlanRepositoryMysql";
import { CreatePlanUseCase } from "../../application/CreatePlanUseCase";
import { DeletePlanUseCase } from "../../application/DeletePlanUseCase";
import { GetAllPlansUseCase } from "../../application/GetAllPlansUseCase";
import { GetByIdPlanUseCase } from "../../application/GetByIdPlanUseCase";
import { UpdatePlanUseCase } from "../../application/UpdatePlanUseCase";
import { CreatePlanController } from "./controllers/CreatePlanController";
import { DeletePlanController } from "./controllers/DeletePlanController";
import { GetAllPlansController } from "./controllers/GetAllPlansController";
import { GetByIdPlanController } from "./controllers/GetByIdPlanController";
import { UpdatePlanController } from "./controllers/UpdatePlanController";
import { database } from "../../../db/Database";

const dataSource = database.getDataSource();

const planRepositoryMysql = new PlanRepositoryMysql(dataSource);

const createPlanUseCase = new CreatePlanUseCase(planRepositoryMysql);
const deletePlanUseCase = new DeletePlanUseCase(planRepositoryMysql);
const getAllPlansUseCase = new GetAllPlansUseCase(planRepositoryMysql);
const getByIdPlanUseCase = new GetByIdPlanUseCase(planRepositoryMysql);
const updatePlanUseCase = new UpdatePlanUseCase(planRepositoryMysql);

export const createPlanController = new CreatePlanController(createPlanUseCase);
export const deletePlanController = new DeletePlanController(deletePlanUseCase);
export const getAllPlansController = new GetAllPlansController(getAllPlansUseCase);
export const getByIdPlanController = new GetByIdPlanController(getByIdPlanUseCase);
export const updatePlanController = new UpdatePlanController(updatePlanUseCase);