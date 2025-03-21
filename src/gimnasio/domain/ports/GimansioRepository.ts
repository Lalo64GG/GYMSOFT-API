import { Gimnasio } from "../entities/Gimnasio";

export interface IGimnasioRepository {
  create(name: String, id_owner: number): Promise<Gimnasio>;
  delete(id: number): Promise<boolean>;
  getAll(): Promise<Gimnasio[]>;
  getById(id: number): Promise<Gimnasio>;
  update(id: number, name: String, id_owner: number): Promise<Gimnasio>;
}
