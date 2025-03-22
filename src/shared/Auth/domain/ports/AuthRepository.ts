import { Auth } from "../entities/Auth";

export interface IAuthRepository {
  createToken(pyload: Auth["payload"]): Promise<string>;
  validateToken(token: string): Promise<boolean | string | object>;
}
