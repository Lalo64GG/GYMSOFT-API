import { Owner } from "../entities/Owner";

export interface IOwnerRepository {
    register(
        name: String,
        last_name: String,
        email: String,
        password: String,
        rol: String
    ): Promise<Owner | string>;
    getByEmail(email: String): Promise<Owner | string>;
}