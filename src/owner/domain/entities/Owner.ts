export class Owner {
    constructor(
        readonly id: number,
        readonly name: String,
        readonly last_name: String,
        readonly email: String,
        readonly password: String,
        readonly rol: String,
    ) { }
}