import { Owner } from "../domain/entities/Owner";
import { IOwnerRepository } from "../domain/ports/OwnerRepository";

export class LoginUseCase {
    constructor(readonly ownerRepository: IOwnerRepository) { }
    async run(email: String): Promise<Owner | null> {
        try {
            const owner = await this.ownerRepository.getByEmail(email);
            if (typeof owner != "string") {
                return owner;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}