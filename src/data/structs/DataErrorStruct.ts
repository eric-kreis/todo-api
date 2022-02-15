import Codes from '../../utils/Codes';

class DataErrorStruct extends Error {
  constructor(public code: Codes, public message: string) {
    super();
  }
}

export default DataErrorStruct;
