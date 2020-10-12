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
    const object: T = plainToClass(dto, req.body, { excludeExtraneousValues: true });   
    console.log(object);
     
    let errors: ValidationError[] =  await validate(object);
    
    
    if (errors.length > 0) {
      errors.forEach((err) => {
        if(err.children.length) {
          err.children.forEach((nestedErr) => errors.push(nestedErr))
        }
      })
      throw new RequestValidationError(errors);
    }
    
    res.locals.input = object;
    next();

  }
}

