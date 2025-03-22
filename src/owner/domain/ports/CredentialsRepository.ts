export interface CredentialsRepository {
    encryptPassword(password: string): string;
    comparePassword(password: string, reqPassword: string): boolean;
    validateEmail(email: string): boolean;
    validatePassword(password: string): boolean;
}