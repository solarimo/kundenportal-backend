import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = <T>(dto: ClassType<T>) => {
  return async function(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const object: T = plainToClass(dto, req.body);
    let errors: ValidationError[] = [];
    try {
      errors = await validate(object, { skipMissingProperties: true });
    } catch (error) {
      console.error(error);
      ;
    }
   

    if (errors.length > 0) {
      throw new RequestValidationError(errors);
    }
    
    res.locals.input = object;
    next();

  }
}

