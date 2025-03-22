import bcrypt from 'bcrypt';
import { z } from 'zod';
import { CredentialsRepository } from '../../domain/ports/CredentialsRepository';

export class CredentialsServices implements CredentialsRepository {
    encryptPassword(password: string): string {
        try {
            const hashedPassword = bcrypt.hashSync(password, 10);
            return hashedPassword;
        } catch (error) {
            return "Error al encriptar la contraseña"
        }
    }

    comparePassword(password: string, reqPassword: string): boolean {
        try {
            const correctPassword = bcrypt.compareSync(password, reqPassword);
            return correctPassword;
        } catch (error) {
            return false;
        }
    }

    validateEmail(email: string): boolean {
        try {
            const emailSchema = z.string().email();
            emailSchema.parse(email);
            return true;
        } catch (error) {
            return false;
        }
    }

    validatePassword(password: string): boolean {
        try {
            const passwordSchema = z.string().min(8);
            passwordSchema.parse(password);
            return true;
        } catch (error) {
            return false;
        }
    }
}