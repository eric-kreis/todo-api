import Codes from '../../utils/Codes';

class DataErrorStruct extends Error {
  public code: Codes;

  public message: string;

  constructor(code: Codes, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}

export default DataErrorStruct;
