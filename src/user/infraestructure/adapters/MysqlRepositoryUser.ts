import { User } from "../../domain/entity/User";
import { DataSource, Repository } from "typeorm";
import { EUser } from "../../../db/entities/EntitieUser";
import { UserRepository } from "../../domain/ports/UserRepository";
import { EOutlet } from "../../../db/entities/EntitieOutlet";
import { EPlan } from "../../../db/entities/EntitiePlan";
import { EGimnasio } from "../../../db/entities/EntitieGimnasio";
import { EAttendance } from "../../../db/entities/EntitieAttendance";

export class MysqlRepositoryUser implements UserRepository {
  private readonly outletRepository: Repository<EOutlet>;
  private readonly userRepository: Repository<EUser>;
  private readonly planRepository: Repository<EPlan>;
  private readonly gimnasioRepository: Repository<EGimnasio>;
  private readonly attendanceRepository: Repository<EAttendance>;

  constructor(private readonly dataSource: DataSource) {
    this.outletRepository = this.dataSource.getRepository(EOutlet);
    this.userRepository = this.dataSource.getRepository(EUser);
    this.planRepository = this.dataSource.getRepository(EPlan);
    this.gimnasioRepository = this.dataSource.getRepository(EGimnasio);
    this.attendanceRepository = this.dataSource.getRepository(EAttendance);
  }

  async createUser(user: User): Promise<User | null> {
    try {
      const plan = await this.planRepository.findOne({
        where: { id: user.id_actualPlan },
      });
      const sucursal = await this.outletRepository.findOne({
        where: {
          id: user.id_sucursal,
        },
      });

      if (!sucursal) {
        console.error(
          "No se encontro ninguna sucursal con el id proporcionada"
        );
        return null;
      }

      const newUser = await this.userRepository.create({
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        input_token: user.input_token,
        sex: user.sex,
        edad: user.old,
        photo: user.photo,
        membership_status: user.membership_status,
        outlet: sucursal,
        plan: plan!,
      });

      const saveUser = await this.userRepository.save(newUser);
      return new User(
        saveUser.id!,
        saveUser.name!,
        saveUser.last_name!,
        saveUser.email!,
        "",
        saveUser.input_token!,
        saveUser.phone!,
        saveUser.sex!,
        saveUser.edad!,
        saveUser.photo!,
        saveUser.membership_status!,
        saveUser.outlet?.id!,
        saveUser.plan?.id!,
        "",
        ""
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getAllUsers(id_gimnasio: number): Promise<User[] | null> {
    try {
      const gimnasio = await this.gimnasioRepository.findOne({
        where: { id: id_gimnasio },
      });
      if (!gimnasio) {
        console.log("error en el gimnasio");
        return null;
      }
      const outlet = await this.outletRepository.find({
        where: { id_gimnasio: gimnasio },
      });
      if (!outlet) {
        console.log("error la sucursal");
        return null;
      }
      const users = await this.userRepository.find({
        relations: ["outlet", "plan"],
        where: { outlet: outlet },
      });

      return users.map(
        (user) =>
          new User(
            user.id!,
            user.name!,
            user.last_name!,
            user.email!,
            "",
            user.input_token!,
            user.phone!,
            user.sex!,
            user.edad!,
            user.photo!,
            user.membership_status!,
            user.outlet?.id!,
            user.plan?.id!,
            "",
            ""
          )
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ["outlet", "plan"],
      });

      if (!user) {
        console.error("No se encontro el usuario con el id proporcionado");
        return null;
      }

      return new User(
        user.id!,
        user.name!,
        user.last_name!,
        user.email!,
        "",
        user.input_token!,
        user.phone!,
        user.sex!,
        user.edad!,
        user.photo!,
        user.membership_status!,
        user.outlet?.id!,
        user.plan?.id!,
        "",
        ""
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateUser(user: User): Promise<User | null> {
    try {
      const plan = await this.planRepository.findOne({
        where: { id: user.id_actualPlan },
      });
      if (!plan) {
        console.error("No se encontro el plan con el id proporcionado");
        return null;
      }
      const outlet = await this.outletRepository.findOne({
        where: { id: user.id_sucursal },
      });
      if (!outlet) {
        console.error("No se encontro la sucursal con el id proporcionado");
        return null;
      }
      const userFind = await this.userRepository.findOne({
        where: { id: user.id },
      });
      if (!userFind) {
        console.error("No se encontro el usuario con el id proporcionado");
        return null;
      }
      userFind.name = user.name;
      userFind.last_name = user.last_name;
      userFind.email = user.email;
      userFind.phone = user.phone;
      userFind.input_token = user.input_token;
      userFind.sex = user.sex;
      userFind.edad = user.old;
      userFind.photo = user.photo;
      userFind.membership_status = user.membership_status;
      userFind.outlet = outlet;
      userFind.plan = plan;

      const saveUser = await this.userRepository.save(userFind);

      return new User(
        saveUser.id!,
        saveUser.name!,
        saveUser.last_name!,
        saveUser.email!,
        "",
        saveUser.input_token!,
        saveUser.phone!,
        saveUser.sex!,
        saveUser.edad!,
        saveUser.photo!,
        saveUser.membership_status!,
        saveUser.outlet?.id!,
        saveUser.plan?.id!,
        "",
        ""
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const result = await this.outletRepository.delete(id);

      if (result.affected === 0) {
        console.error(
          "No se encontró el usuario a eliminar con el id proporcionado"
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async auth(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      if (!user) {
        console.error(
          "No se encontró el usuario a eliminar con el email proporcionado"
        );
        return null;
      }
      return new User(
        user.id!,
        user.name!,
        user.last_name!,
        user.email!,
        "",
        user.input_token!,
        user.phone!,
        user.sex!,
        user.edad!,
        user.photo!,
        user.membership_status!,
        user.outlet?.id!,
        user.plan?.id!,
        "",
        ""
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getQR(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ["outlet", "plan", "attendances"],
      });

      if (!user) {
        console.error("No se encontro el usuario con el id proporcionado");
        return null;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const attendance = await this.attendanceRepository.findOne({
        where: {
          user: { id: user.id },
          fecha: today,
        },
        relations: ["user"],
      });

     
      return new User(
        user.id!,
        user.name!,
        user.last_name!,
        user.email!,
        "",
        user.input_token!,
        user.phone!,
        user.sex!,
        user.edad!,
        user.photo!,
        user.membership_status!,
        user.outlet?.id!,
        user.plan?.id!,
        attendance?.entrada!,
        attendance?.salida!
      );
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
