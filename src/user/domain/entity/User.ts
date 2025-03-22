export class User {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly last_name: string,
        readonly email:string,
        readonly password:string,
        readonly input_token:string,
        readonly phone: string,
        readonly sex: string,
        readonly old: number,
        readonly photo: string,
        readonly membership_status: boolean,
        readonly id_sucursal: number,
        readonly id_actualPlan: number,
        readonly entrada:string,
        readonly salida:string
    ) {}
}