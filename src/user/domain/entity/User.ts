export class User {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly last_name: string,
        readonly phone: string,
        readonly sex: string,
        readonly photo: string,
        readonly membership_status: boolean,
        readonly id_sucursal: number,
        readonly id_actualPlan: number,
    ) {}
}