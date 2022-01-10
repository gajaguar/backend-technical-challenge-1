import { Express, NextFunction, Request, Response, Router } from 'express'
import { validationHandler } from 'network/middlewares'
import { AuthorCreate, AuthorId, AuthorUpdate } from 'schemas'
import { authors } from '../resources'

const router = Router()

/**
 * Congifure the routes for the authors resource.
 * @param app - Express instance.
 */
export const authorsRouter = (app: Express): void => {
  /** Generate an endpoint to create a author. */
  router.post(
    '/',
    validationHandler(AuthorCreate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body
        const result = await authors.create(data)
        res.status(201).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to read all authors. */
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authors.readAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  })

  /** Generate an endpoint to read an author. */
  router.get(
    '/:id',
    validationHandler(AuthorId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const result = await authors.readOne(parseInt(id))
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to update an author. */
  router.patch(
    '/:id',
    validationHandler(AuthorId, 'params'),
    validationHandler(AuthorUpdate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const data = req.body
        const result = await authors.update(parseInt(id), data)
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to delete an author. */
  router.delete(
    '/:id',
    validationHandler(AuthorId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        await authors.delete(parseInt(id))
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    }
  )

  /** Attach the router to the express instance. */
  app.use('/api/authors', router)
}
