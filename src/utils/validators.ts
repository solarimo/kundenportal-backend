import { ClassType } from "class-transformer/ClassTransformer";
import {registerDecorator, ValidationArguments} from "class-validator";
 
export function IsInstanceOf<T, E>(type1: ClassType<T>, type2: ClassType<E>) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isInstanceOf",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [type1, type2],
            options: {
              message: 'All Properties must be defined'
            },
            validator: {
                validate(value: any, args: ValidationArguments) {
                  if (value instanceof type1) {
                    return true;
                  } else {
                    return value instanceof type2;
                  }
                }
            }
        });
   };
}