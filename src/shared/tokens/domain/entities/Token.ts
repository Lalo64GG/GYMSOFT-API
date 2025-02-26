export class Token {
  constructor(
    readonly pyload: JSON,
    readonly secret: string,
    readonly options: JSON
  ) {}
}
