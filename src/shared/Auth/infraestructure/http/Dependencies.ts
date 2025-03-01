import { CreateTokenUseCase } from "../../application/CreateTokenUseCase";
import { ValidateTokenUseCase } from "../../application/ValidateTokenUseCase";
import { CreateTokenControll } from "./controllers/CreateTokenController";
import { ValidateTokenControll } from "./controllers/ValidateTokenController";
import { AuthServices } from "../adapters/ServicesJWTRepository";
import { database } from "../../../../db/Database";

const dataSource = database.getDataSource();

const authServices = new AuthServices(dataSource);

const createTokenUseCase = new CreateTokenUseCase(authServices);
const validateTokenUseCase = new ValidateTokenUseCase(authServices);

export const createTokenControll = new CreateTokenControll(createTokenUseCase);
export const validateTokenControll = new ValidateTokenControll(
  validateTokenUseCase
);
