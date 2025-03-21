import { DataSource, Repository } from "typeorm";
import { IGimnasioRepository } from "../../domain/ports/GimansioRepository";
import { EGimnasio } from "../../../db/entities/EntitieGimnasio";
import { Gimnasio } from "../../domain/entities/Gimnasio";
import { EOwner } from "../../../db/entities/EntitieOwner";

export class GimnasioRepositoryMysql implements IGimnasioRepository {
  private readonly gimnasioRepository: Repository<EGimnasio>;
  private readonly ownerRepository: Repository<EOwner>;

  constructor(private readonly dataSource: DataSource) {
    this.gimnasioRepository = this.dataSource.getRepository(EGimnasio);
    this.ownerRepository = this.dataSource.getRepository(EOwner);
  }

  async create(name: String, id_owner: number): Promise<Gimnasio> {
    try {
      const owner = await this.ownerRepository.findOne({
        where: { id: id_owner },
      });
      if (!owner)
        throw new Error(
          "Error: Encargado no encontrado con el id proporcionado"
        );
      const gymnasio = this.gimnasioRepository.create({
        name,
        owner: owner,
      });
      const saveGimnasio = await this.gimnasioRepository.save(gymnasio);

      if (!saveGimnasio || !saveGimnasio.id)
        throw new Error("Error: No se pudo crear el gimnasio");

      return new Gimnasio(saveGimnasio.id!, saveGimnasio.name!, id_owner);
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el gimnasio: " + error);
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.gimnasioRepository.delete(id);
      if (result.affected === 0) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error("Error al eliminar el gimnasio: " + error);
    }
  }

  async getAll(): Promise<Gimnasio[]> {
    try {
      const gimnasios = await this.gimnasioRepository.find({
        relations: ["owner"],
      });

      return gimnasios.map(
        (gimnasio) =>
          new Gimnasio(gimnasio.id!, gimnasio.name!, gimnasio.owner?.id!)
      );
    } catch (error) {
       console.log(error);
      throw new Error("Error al obtener los gimnasios: " + error);
    }
  }

  async getById(id: number): Promise<Gimnasio> {
    try {
      const gimnasio = await this.gimnasioRepository.findOne({
        where: { id },
        relations: ["owner"],
      });
      if (!gimnasio)
        throw new Error(
          "Error: Gimnasio no encontrado con el id proporcionado"
        );
      return new Gimnasio(gimnasio.id!, gimnasio.name!, gimnasio.owner?.id!);
    } catch (error) {
      throw new Error("Error al obtener el gimnasio: " + error);
    }
  }

  async update(id: number, name: String, id_owner: number): Promise<Gimnasio> {
    try {
      const owner = await this.ownerRepository.findOne({
        where: { id: id_owner },
      });
      if (!owner)
        throw new Error(
          "Error: Encargado no encontrado con el id proporcionado"
        );

      const gimnasio = await this.gimnasioRepository.findOne({
        where: { id: id },
      });
      if (!gimnasio)
        throw new Error(
          "Error: Gimnasio no encontrado con el id proporcionado"
        );

      gimnasio.name = name;
      gimnasio.owner = owner;

      const updateGimnasio = await this.gimnasioRepository.save(gimnasio);

      return new Gimnasio(updateGimnasio.id!, updateGimnasio.name!, updateGimnasio.owner?.id!);
    } catch (error) {
      throw new Error("Error al actualizar el gimnasio: " + error);
    }
  }
}
