import { verify, sign, TokenExpiredError } from "jsonwebtoken";
import { DataSource, Repository } from "typeorm";
import { EUser } from "../../../../db/entities/EntitieUser";
import { EOwner } from "../../../../db/entities/EntitieOwner";
import { IAuthRepository } from "../../domain/ports/AuthRepository";
import { Auth } from "../../domain/entities/Auth";

export class AuthServices implements IAuthRepository {
  private readonly ownerRepository: Repository<EOwner>;
  private readonly userRepository: Repository<EUser>;

  constructor(private readonly dataSource: DataSource) {
    this.ownerRepository = this.dataSource.getRepository(EOwner);
    this.userRepository = this.dataSource.getRepository(EUser);
  }

  async createToken(payload: Auth["pyload"]): Promise<string> {
    try {
      const secret = process.env.SECRET_KEY_TOKEN;

      if (!secret || typeof secret !== "string" || secret.trim() === "") {
        throw new Error(
          "Error: La variable de entorno SECRET_KEY_TOKEN no está definida o es inválida."
        );
      }

      return sign({ pyload: payload }, secret, { expiresIn: "1h" });
    } catch (error) {
      console.error("Error al crear el token:", error);
      throw new Error("No se pudo generar el token.");
    }
  }

  async validateToken(token: string): Promise<boolean | string | object> {
    try {
      const secret = process.env.SECRET_KEY_TOKEN;

      if (!secret || typeof secret !== "string" || secret.trim() === "") {
        throw new Error(
          "La variable de entorno SECRET_KEY_TOKEN no está definida o es inválida."
        );
      }

      try {
        const access = await verify(token, secret) as any;
        console.log(access);
        
        let repo: Repository<EUser | EOwner>;
        if (access.pyload.rol === "admin") {
          repo = this.ownerRepository;
        } else {
          repo = this.userRepository;
        }

        const exist = await repo.findOne({
          where: { id: access.pyload.id },
        });

        return exist ? true : false;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          console.warn("Token expirado, generando uno nuevo...");
          const decoded = verify(token, secret, {
            ignoreExpiration: true,
          }) as any;
          return await this.createToken(decoded.pyload);
        } else {
          console.error("Error al validar el token:", error);
          return false;
        }
      }
    } catch (error) {
      console.error("Error en validateToken:", error);
      return "error: " + error;
    }
  }
}
