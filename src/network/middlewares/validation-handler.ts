import boom from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'
import { Schema } from 'joi'

/**
 * Generator of validation middleware.
 * @param schema - A Joi schema.
 * @param property - The property to evaluate.
 * @returns - A function that validates the schema.
 */
export const validationHandler = (schema: Schema, property = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Next line solve the use of a string as an index.
    // credits to: Guillaume F.
    // https://stackoverflow.com/questions/62438346/how-to-dynamically-access-object-property-in-typescript
    const key = property as keyof typeof req
    const data = req[key]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      next(boom.badRequest(error.message))
    }
    next()
  }
}
