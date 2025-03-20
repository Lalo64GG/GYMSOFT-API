import { DataSource, Repository } from "typeorm";
import { IPlanRepository } from "../../domain/ports/PlanRepository";
import { Plan } from "../../domain/entities/Plan";
import { EGimnasio } from "../../../db/entities/EntitieGimnasio";
import { EPlan } from "../../../db/entities/EntitiePlan";

export class PlanRepositoryMysql implements IPlanRepository {
  private readonly planRepository: Repository<EPlan>;
  private readonly gimnasioRepository: Repository<EGimnasio>;

  constructor(private readonly dataSource: DataSource) {
    this.planRepository = this.dataSource.getRepository(EPlan);
    this.gimnasioRepository = this.dataSource.getRepository(EGimnasio);
  }

  async create(
    name: string,
    cost: number,
    date: string,
    id_gimnasio: number
  ): Promise<Plan | string> {
    try {
      const gimnasio = await this.gimnasioRepository.findOne({
        where: { id: id_gimnasio },
      });
      if (!gimnasio) return "Error: Gym no encontrado con el id proporcionado";

      const newPlan = this.planRepository.create({
        name,
        cost,
        date,
        id_gimnasio: gimnasio,
      });

      const savedPlan = await this.planRepository.save(newPlan);

      if (!savedPlan || !savedPlan.id) {
        return "Error: No se pudo guardar el plan";
      }

      return new Plan(
        savedPlan.id!,
        savedPlan.name!,
        savedPlan.cost!,
        savedPlan.date!.toISOString(),
        id_gimnasio
      );
    } catch (error) {
      return "Error: " + error;
    }
  }

  async delete(id: number): Promise<Boolean | string> {
    try {
      const result = await this.planRepository.delete(id);

      if (result.affected === 0) {
        return "Error: No se encontró el plan a eliminar";
      }
      return true;
    } catch (error) {
      return "Error: " + error;
    }
  }

  async getAll(): Promise<Plan[] | string> {
    try {
      const plans = await this.planRepository.find({
        relations: ["id_gimnasio"],
      });
      return plans.map(
        (plan) =>
          new Plan(
            plan.id!,
            plan.name!,
            plan.cost!,
            plan.date!.toISOString(),
            plan.id_gimnasio?.id!
          )
      );
    } catch (error) {
      return "Error: " + error;
    }
  }

  async getById(id: number): Promise<Plan | string> {
    try {
      const plan = await this.planRepository.findOne({
        where: { id },
        relations: ["id_gimnasio"],
      });

      if (!plan)
        return "Error: Plan no encontrado con el id proporcionado";

      return new Plan(
        plan.id!,
        plan.name!,
        plan.cost!,
        plan.date!.toISOString(),
        plan.id_gimnasio?.id!
      );
    } catch (error) {
      return "Error: " + error;
    }
  }

  async update(
    id: number,
    name: string,
    cost: number,
    date: string,
    id_gimnasio: number
  ): Promise<Plan | string> {
    try {

      const plan = await this.planRepository.findOne({ where: { id } });
      if (!plan) return "Error: plan no encontrado";

      const gimnasio = await this.gimnasioRepository.findOne({
        where: { id: id_gimnasio },
      });
      if (!gimnasio) return "Error: Gym no encontrado con el id proporcionado";

      plan.name = name;
      plan.cost = cost;
      plan.date = new Date(date)
      plan.id_gimnasio = gimnasio;

      const updatedPlan = await this.planRepository.save(plan);

      return new Plan(
        updatedPlan.id!,
        updatedPlan.name!,
        updatedPlan.cost!,
        updatedPlan.date!.toISOString(),
        updatedPlan.id_gimnasio?.id!
      );
    } catch (error) {
      return "Error: " + error;
    }
  }
}
