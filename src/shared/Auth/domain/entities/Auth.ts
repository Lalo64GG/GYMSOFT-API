export class Auth {
  constructor(
    readonly payload: Payload,
    readonly pyload: Pyload,
    readonly secret: string,
    readonly options: JSON
  ) { }
}

class Pyload {
  constructor(
    readonly id: number,
    readonly id_outlet: number,
    readonly rol: string,
    readonly id_gimnasio: number
  ) {}
}

class Payload {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly rol: string,
  ) { }
}