import { RegisterUseCase } from "../../../application/RegisterUseCase";
import { Request, Response } from "express";
import { Owner } from "../../../domain/entities/Owner";
import { CredentialsServices } from "../../adapters/UserValidationRepository";

export class RegisterController {
    constructor(
        readonly registerUseCase: RegisterUseCase,
        readonly credentials: CredentialsServices
    ) { }
    async run(req: Request, res: Response) {
        try {
            const data = req.body;
            if (!this.credentials.validateEmail(data.email)) {
                return res.status(401).json({
                    status: 'error',
                    msg: 'Formato de correo inválido',
                });
            }
            if (!this.credentials.validatePassword(data.password)) {
                return res.status(401).json({
                    status: 'error',
                    msg: 'La contraseña debe contener más de 8 caracteres',
                });
            }

            const hashedPassword = this.credentials.encryptPassword(data.password);
            const newOwner = await this.registerUseCase.run(
                data.name,
                data.last_name,
                data.email,
                hashedPassword,
                data.rol
            );

            if (newOwner instanceof Owner) {
                const responseData = {
                    id: newOwner?.id,
                    name: newOwner?.name,
                    last_name: newOwner?.last_name,
                    email: newOwner?.email,
                    password: newOwner?.password,
                    rol: newOwner?.rol,
                };
                return res.status(201).json({
                    success: true,
                    data: responseData,
                    messages: "Usuario registrado con éxito",
                });
            } else {
                return res.status(400).json({ success: false, error: newOwner });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                error: error,
            });
        }
    }
}