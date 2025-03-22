export class FileUpload {
  constructor(
    readonly filename: string,
    readonly originalname: string,
    readonly size: number,
    readonly mimetype: string,
    readonly path: string,
    readonly destination: string
  ) {}
}
