export class Plan {
    constructor(
        readonly id: number,
        readonly name: String,
        readonly cost: number,
        readonly date: String,
        readonly id_gimnasio: number
    ) { }
}