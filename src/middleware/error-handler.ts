import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  } 
  if(err instanceof SyntaxError) {
    return res.status(400).send({
      errors: [{ message: 'Error in parsing Json' }]
    })
  }

  console.log(err);
  

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
