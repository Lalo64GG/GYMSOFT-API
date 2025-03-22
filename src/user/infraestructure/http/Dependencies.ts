import { CreateUserUseCase } from "../../application/CreateUserUseCase";
import { DeleteUserUseCase } from "../../application/DeleteUserUseCase";
import { GetAllUsersUseCase } from "../../application/GetAllUsesUseCase";
import { GetByIdUserUseCase } from "../../application/GetByIdUserUseCase";
import { UpdateUserUseCase } from "../../application/UpdateUserUseCase";
import { AuthUserUseCase } from "../../application/AuhtUserUseCase";
import { GetQRUserUseCase } from "../../application/GetQRUserUseCase";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { GetAllUsersController } from "./controllers/GetAllUsersController";
import { GetByIdUserController } from "./controllers/GetByIdUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import { AuthUserController } from "./controllers/AuthUserController";
import { GetQRUserController } from "./controllers/GetQRUserController";
import { MysqlRepositoryUser } from "../adapters/MysqlRepositoryUser";
import { EncryptServices } from "../adapters/ServicesEncript";
import { database } from "../../../db/Database";

const dataSource = database.getDataSource();

const repository = new MysqlRepositoryUser(dataSource);
const servicesEncript = new EncryptServices();

const cretaeUserUseCase = new CreateUserUseCase(repository, servicesEncript);
const authUserUseCase = new AuthUserUseCase(repository, servicesEncript);
const deleteUserUseCase = new DeleteUserUseCase(repository);
const getAllUsersUseCase = new GetAllUsersUseCase(repository);
const getByIdUserUseCase = new GetByIdUserUseCase(repository);
const updateUserUseCase = new UpdateUserUseCase(repository);
const getQRUserUseCase = new GetQRUserUseCase(repository);

export const createUserController = new CreateUserController(cretaeUserUseCase);
export const deleteUserController = new DeleteUserController(deleteUserUseCase);
export const getAllUsersController = new GetAllUsersController(
  getAllUsersUseCase
);
export const getByIdUserController = new GetByIdUserController(
  getByIdUserUseCase
);
export const updateUserController = new UpdateUserController(updateUserUseCase);
export const authUserController = new AuthUserController(authUserUseCase);
export const getQRUserController = new GetQRUserController(getQRUserUseCase);
