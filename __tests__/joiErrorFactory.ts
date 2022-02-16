import { ValidationResult } from 'joi';

const joiErrorFactory = (message: string) => ({
  error: {
    message,
  },
} as ValidationResult);

export default joiErrorFactory;
