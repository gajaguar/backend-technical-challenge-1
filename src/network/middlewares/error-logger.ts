import { NextFunction, Request, Response } from 'express'

/**
 * Capture any error and logged it.
 *
 * @param err - A type error object.
 * @param req - The client request.
 * @param res - The server response.
 * @param next - A call to the next middleware function.
 */
export const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err.stack)

  next(err)
}
