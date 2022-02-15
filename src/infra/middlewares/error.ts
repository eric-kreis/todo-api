import { ErrorRequestHandler } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import DataErrorStruct from '../../data/structs/DataErrorStruct';
import { RequestErrorBuilder } from '../../entities/builders';

const error: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof DataErrorStruct) {
    return res.status(StatusCodes[err.code]).json({
      error: {
        code: getReasonPhrase(StatusCodes[err.code]),
        message: err.message,
      },
    });
  }

  if (err instanceof RequestErrorBuilder) {
    return res.status(err.status).json({
      error: {
        code: getReasonPhrase(err.status),
        message: err.message,
      },
    });
  }

  console.log(err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: {
      code: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      message: 'Internal server error',
    },
  });
};

export default error;
