export class Auth {
  constructor(
    readonly pyload: Pyload,
    readonly secret: string,
    readonly options: JSON
  ) {}
}

class Pyload {
  constructor(
    readonly id: number,
    readonly id_outlet: number,
    readonly rol: string,
    readonly id_gimnasio: number
  ) {}
}
