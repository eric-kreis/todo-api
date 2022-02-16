import { ValidationResult } from 'joi';

const joiErrorFactory = (message: string) => ({
  error: {
    message,
  },
  value: undefined,
} as ValidationResult);

export default joiErrorFactory;
