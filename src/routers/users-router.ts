import { Express, NextFunction, Request, Response, Router } from 'express'
import { validationHandler } from 'network/middlewares'
import { UserCreate, UserId, UserUpdate } from 'schemas'
import { users } from '../resources'

const router = Router()

/**
 * Congifure the routes for the users resource.
 * @param app - Express instance.
 */
export const usersRouter = (app: Express): void => {
  /** Generate an endpoint to create a user. */
  router.post(
    '/',
    validationHandler(UserCreate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body
        const result = await users.create(data)
        res.status(201).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to read all users. */
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await users.readAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  })

  /** Generate an endpoint to read a user. */
  router.get(
    '/:id',
    validationHandler(UserId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const result = await users.readOne(parseInt(id))
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to update a user. */
  router.patch(
    '/:id',
    validationHandler(UserId, 'params'),
    validationHandler(UserUpdate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const data = req.body
        const result = await users.update(parseInt(id), data)
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to delete a user. */
  router.delete(
    '/:id',
    validationHandler(UserId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        await users.delete(parseInt(id))
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    }
  )

  /** Attach the router to the express instance. */
  app.use('/api/users', router)
}
