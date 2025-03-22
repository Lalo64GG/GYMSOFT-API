import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/LoginUseCase';
import { CredentialsServices } from '../../adapters/UserValidationRepository';
import { Auth } from '../../../../shared/Auth/domain/entities/Auth';
import { CreateTokenUseCase } from '../../../../shared/Auth/application/CreateTokenUseCase';

export class LoginController {
    constructor(
        readonly loginUseCase: LoginUseCase,
        readonly credentials: CredentialsServices,
        readonly createToken: CreateTokenUseCase
    ) { }

    async run(req: Request, res: Response) {
        try {
            const data = req.body;
            const owner = await this.loginUseCase.run(data.email);
            if (!owner) {
                return res.status(404).json({
                    status: 'error',
                    msg: 'Correo incorrecto'
                });
            }

            const isPasswordValid = this.credentials.comparePassword(
                data.password,
                owner.password.toString()
            );
            if (!isPasswordValid) {
                return res.status(401).json({
                    status: 'error',
                    msg: 'Contraseña incorrecta'
                });
            }

            const payload: Auth["payload"] = {
                id: owner.id,
                rol: owner.rol.toString(),
                email: owner.email.toString()
            };
            const token = await this.createToken.run(payload);
            res.status(200)
                .header({ Authorization: `Bearer ${token}` })
                .json({
                    status: 'success',
                    msg: 'Acceso exitoso al sistema',
                    data: owner,
                    token,
                });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: error,
            });
        }
    }
}