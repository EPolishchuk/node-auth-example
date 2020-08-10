abstract class HttpError extends Error {
  public status!: number;
}

export class BadRequest extends HttpError {
  constructor(message = 'Bad request') {
    super(message);

    this.status = 400;
  }
}
