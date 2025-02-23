import { DataSource, Repository } from "typeorm";
import { EOutlet } from "../../../db/entities/EntitieOutlet";
import { IOutletRepository } from "../../domain/ports/OutletRepository";
import { Outlet } from "../../domain/entities/Outlet";
import { EOwner } from "../../../db/entities/EntitieOwner";
import { EGimnasio } from "../../../db/entities/EntitieGimnasio";

export class OutletRepositoryMysql implements IOutletRepository {
  private readonly outletRepository: Repository<EOutlet>;

  constructor(private readonly dataSource: DataSource) {
    this.outletRepository = this.dataSource.getRepository(EOutlet);
  }
  
  async create(
    name: string,
    address: string,
    id_owner: number,
    id_gimnasio: number
  ): Promise<Outlet | string> {
    try {
      const ownerRepository = this.dataSource.getRepository(EOwner);
      const gimnasioRepository = this.dataSource.getRepository(EGimnasio);

      const owner = await ownerRepository.findOne({ where: { id: id_owner } });
      if (!owner) return "Error: Encargado no encontrado con el id proporcionado";

      const gimnasio = await gimnasioRepository.findOne({
        where: { id: id_gimnasio },
      });
      if (!gimnasio) return "Error: Gym no encontrado con el id proporcionado";

      const newOutlet = this.outletRepository.create({
        name,
        address,
        id_owner: owner,
        id_gimnasio: gimnasio,
      });

      const savedOutlet = await this.outletRepository.save(newOutlet);

      if (!savedOutlet || !savedOutlet.id) {
        return "Error: No se pudo guardar el outlet";
      }

      return new Outlet(
        savedOutlet.id!,
        savedOutlet.name!,
        savedOutlet.address!,
        id_owner,
        id_gimnasio
      );
    } catch (error) {
      return "Error: " + error;
    }
  }

  async delete(id: number): Promise<Boolean | string> {
    try {
      const result = await this.outletRepository.delete(id);

      if (result.affected === 0) {
        return "Error: No se encontró la sucursal a eliminar";
      }
      return true;
    } catch (error) {
      return "Error: " + error;
    }
  }

  async getAll(): Promise<Outlet[] | string> {
    try {
      const outlets = await this.outletRepository.find({
        relations: ["id_owner", "id_gimnasio"],
      });

      return outlets.map(
        (outlet) =>
          new Outlet(
            outlet.id!,
            outlet.name!,
            outlet.address!,
            outlet.id_owner?.id!,
            outlet.id_gimnasio?.id!
          )
      );
    } catch (error) {
      return "Error: " + error;
    }
  }

  async getById(id: number): Promise<Outlet | string> {
    try {
      
      const outlet = await this.outletRepository.findOne({
        where: { id },
        relations: ["id_owner", "id_gimnasio"],
      });

      if (!outlet) return "Error: Outlet no encontrado con el id proporcionado";

      return new Outlet(
        outlet.id!,
        outlet.name!,
        outlet.address!,
        outlet.id_owner?.id!,
        outlet.id_gimnasio?.id!
      );
    } catch (error) {
      return "Error: " + error;
    }
  }

  async update(
    id: number,
    name: string,
    address: string,
    id_owner: number,
    id_gimnasio: number
  ): Promise<Outlet | string> {
    try {
      const ownerRepository = this.dataSource.getRepository(EOwner);
      const gimnasioRepository = this.dataSource.getRepository(EGimnasio);

      const outlet = await this.outletRepository.findOne({ where: { id } });
      if (!outlet) return "Error: Outlet no encontrado";

      const owner = await ownerRepository.findOne({ where: { id: id_owner } });
      if (!owner) return "Error: Owner no encontrado con el id proporcionado";

      const gimnasio = await gimnasioRepository.findOne({
        where: { id: id_gimnasio },
      });
      if (!gimnasio) return "Error: Gym no encontrado con el id proporcionado";

      outlet.name = name;
      outlet.address = address;
      outlet.id_owner = owner;
      outlet.id_gimnasio = gimnasio;

      const updatedOutlet = await this.outletRepository.save(outlet);

      return new Outlet(
        updatedOutlet.id!,
        updatedOutlet.name!,
        updatedOutlet.address!,
        updatedOutlet.id_owner?.id!,
        updatedOutlet.id_gimnasio?.id!
      );
    } catch (error) {
      return "Error: " + error;
    }
  }
}
