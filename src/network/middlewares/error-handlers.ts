import { Boom } from '@hapi/boom'
import { NextFunction, Request, Response } from 'express'

/**
 * Capture a Boom error and send it to the client.
 * @param err - A type error object.
 * @param req - The client request.
 * @param res - The server response.
 * @param next - A call to the next middleware function.
 */
export const boomErrorHandler = (
  err: Boom,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof Boom) {
    res.status(err.output.statusCode).json(err.output.payload)
  } else {
    next(err)
  }
}

/**
 * Capture any error and send it to the client.
 * @param err - A type error object.
 * @param req - The client request.
 * @param res - The server response.
 * @param next - A call to the next middleware function.
 */
export const errorHandler = (
  err: Boom,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (process.env.NODE_ENV === 'production') {
    delete err.stack
  }
  res.status(500).json(err)
  next()
}
