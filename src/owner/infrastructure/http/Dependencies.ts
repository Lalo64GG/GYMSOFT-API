import { OwnerRepositoryMysql } from "../adapters/OwnerRepositoryMysql";
import { RegisterUseCase } from "../../application/RegisterUseCase";
import { LoginUseCase } from "../../application/LoginUseCase";
import { RegisterController } from "./controllers/RegisterController";
import { LoginController } from "./controllers/LoginController";
import { CredentialsServices } from "../adapters/UserValidationRepository";
import { CreateTokenUseCase } from "../../../shared/Auth/application/CreateTokenUseCase";
import { AuthServices } from "../../../shared/Auth/infraestructure/adapters/ServicesJWTRepository";
import { database } from "../../../db/Database";

const dataSource = database.getDataSource();
const authServices = new AuthServices(dataSource);

const ownerRepositoryMysql = new OwnerRepositoryMysql(dataSource);
const credentials = new CredentialsServices();
const createTokenUseCase = new CreateTokenUseCase(authServices);

const registerUseCase = new RegisterUseCase(ownerRepositoryMysql);
const loginUseCase = new LoginUseCase(ownerRepositoryMysql);

export const registerController = new RegisterController(registerUseCase, credentials);
export const loginController = new LoginController(loginUseCase, credentials, createTokenUseCase);