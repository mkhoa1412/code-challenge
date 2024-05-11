import { ZodError, ZodType, ZodTypeDef } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../core/errorResponse';

interface ValidateMiddlewareProps {
  bodySchema?: ZodType<any, ZodTypeDef, any>;
}

const validate = ({ bodySchema }: ValidateMiddlewareProps) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const { body } = req;

      if (bodySchema) {
        bodySchema.parse(body);
      }

      next();
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestError({
          errors: e.errors,
          message: 'Bad Request',
          code: 404,
        });
      }

      next(e);
    }
  };
};

export default validate;
