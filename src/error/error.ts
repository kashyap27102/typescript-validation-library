export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
export class CustomeError extends Error {
  constructor(
    public message: string,
    public invalidTypeMsg?: string,
  ) {
    super(message);
    this.name = 'CustomeError';
  }
}
