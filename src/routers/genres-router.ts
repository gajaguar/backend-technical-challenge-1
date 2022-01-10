import { Express, NextFunction, Request, Response, Router } from 'express'
import { validationHandler } from 'network/middlewares'
import { GenreCreate, GenreId, GenreUpdate } from 'schemas'
import { genres } from '../resources'

const router = Router()

/**
 * Congifure the routes for the genres resource.
 * @param app - Express instance.
 */
export const genresRouter = (app: Express): void => {
  /** Generate an endpoint to create a genre. */
  router.post(
    '/',
    validationHandler(GenreCreate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body
        const result = await genres.create(data)
        res.status(201).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to read all genres. */
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await genres.readAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  })

  /** Generate an endpoint to read a genre. */
  router.get(
    '/:id',
    validationHandler(GenreId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const result = await genres.readOne(parseInt(id))
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to update a genre. */
  router.patch(
    '/:id',
    validationHandler(GenreId, 'params'),
    validationHandler(GenreUpdate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const data = req.body
        const result = await genres.update(parseInt(id), data)
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to delete a genre. */
  router.delete(
    '/:id',
    validationHandler(GenreId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        await genres.delete(parseInt(id))
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    }
  )

  /** Attach the router to the express instance. */
  app.use('/api/genres', router)
}
