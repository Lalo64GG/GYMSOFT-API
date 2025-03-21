import { Outlet } from "../entities/Outlet";

export interface IOutletRepository {
  create(
    name: String,
    address: String,
    id_owner: number,
    id_gimnasio: number
  ): Promise<Outlet | string>;
  delete(id: number): Promise<Boolean | string>;
  getAll(): Promise<Outlet[] | string>;
  getById(id: number): Promise<Outlet | string>;
  update(
    id: number,
    name: String,
    address: String,
    id_owner: number,
    id_gimnasio: number
  ): Promise<Outlet | string>;
}
