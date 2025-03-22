import { DataSource, Repository } from "typeorm";
import { EOwner } from "../../../db/entities/EntitieOwner";
import { IOwnerRepository } from "../../domain/ports/OwnerRepository";
import { Owner } from "../../domain/entities/Owner";

export class OwnerRepositoryMysql implements IOwnerRepository {
    private readonly ownerRepository: Repository<EOwner>;

    constructor(private readonly dataSource: DataSource) {
        this.ownerRepository = this.dataSource.getRepository(EOwner)
    }

    async register(
        name: string,
        last_name: string,
        email: string,
        password: string,
        rol: string
    ): Promise<Owner | string> {
        try {
            const owner = await this.ownerRepository.findOne({ where: { email: email } });
            if (owner) return "Error: Este correo ya está en uso, ingrese otro";

            const newOwner = this.ownerRepository.create({
                name,
                last_name,
                email,
                password,
                rol
            });

            const savedOwner = await this.ownerRepository.save(newOwner);

            if (!savedOwner || !savedOwner.id) {
                return "Error: No se pudo registrar";
            }

            return new Owner(
                savedOwner.id!,
                savedOwner.name!,
                savedOwner.last_name!,
                savedOwner.email!,
                savedOwner.password!,
                savedOwner.rol!
            );
        } catch (error) {
            return "Error: " + error;
        }
    }

    async getByEmail(email: string): Promise<Owner | string> {
        try {
            const owner = await this.ownerRepository.findOne({
                where: { email }
            });

            if (!owner)
                return "Error: Propietario no encontrado con el id proporcionado";

            return new Owner(
                owner.id!,
                owner.name!,
                owner.last_name!,
                owner.email!,
                owner.password!,
                owner.rol!
            );
        } catch (error) {
            return "Error: " + error;
        }
    }
}
