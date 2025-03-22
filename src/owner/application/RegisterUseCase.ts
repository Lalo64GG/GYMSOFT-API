import { Owner } from "../domain/entities/Owner";
import { IOwnerRepository } from "../domain/ports/OwnerRepository";

export class RegisterUseCase {
    constructor(readonly ownerRepository: IOwnerRepository) { }

    async run(
        name: String,
        last_name: String,
        email: String,
        password: String,
        rol: String
    ): Promise<Owner | string> {
        try {
            const newOwner = await this.ownerRepository.register(
                name,
                last_name,
                email,
                password,
                rol
            );
            if (typeof newOwner != "string") {
                return newOwner;
            } else {
                return newOwner;
            }
        } catch (error) {
            console.log(error);
            return "error: " + error;
        }
    }
}