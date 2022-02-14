import { IRequestErrorBuilder } from '../../domains/entity/builder/Error';

class RequestErrorBuilder implements IRequestErrorBuilder {
  public status: null | number;

  public message: null | string;

  constructor() {
    this.status = null;
    this.message = null;
  }

  public setStatus(status: number) {
    this.status = status;
    return this;
  }

  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  public build() {
    return this;
  }
}

export default RequestErrorBuilder;
