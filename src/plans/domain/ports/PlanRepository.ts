import { Plan } from "../entities/Plan";

export interface IPlanRepository {
  create(
    name: String,
    cost: number,
    date: String,
    id_gimnasio: number
  ): Promise<Plan | string>;
  delete(id: number): Promise<Boolean | string>;
  getAll(): Promise<Plan[] | string>;
  getById(id: number): Promise<Plan | string>;
  update(
    id: number,
    name: String,
    cost: number,
    date: String,
    id_gimnasio: number
  ): Promise<Plan | string>;
}