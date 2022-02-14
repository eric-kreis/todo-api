interface IRequestErrorBuilder {
  status: null | number;

  message: null | string;

  setStatus(status: number): this;

  setMessage(message: string): this;

  build(): this;
}

export default IRequestErrorBuilder;
