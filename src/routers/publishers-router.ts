import { Express, NextFunction, Request, Response, Router } from 'express'
import { validationHandler } from 'network/middlewares'
import { PublisherCreate, PublisherId, PublisherUpdate } from 'schemas'
import { publishers } from '../resources'

const router = Router()

/**
 * Congifure the routes for the publishers resource.
 * @param app - Express instance.
 */
export const publishersRouter = (app: Express): void => {
  /** Generate an endpoint to create a publisher. */
  router.post(
    '/',
    validationHandler(PublisherCreate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body
        const result = await publishers.create(data)
        res.status(201).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to read all publishers. */
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await publishers.readAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  })

  /** Generate an endpoint to read a publisher. */
  router.get(
    '/:id',
    validationHandler(PublisherId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const result = await publishers.readOne(parseInt(id))
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to update a publisher. */
  router.patch(
    '/:id',
    validationHandler(PublisherId, 'params'),
    validationHandler(PublisherUpdate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const data = req.body
        const result = await publishers.update(parseInt(id), data)
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to delete a publisher. */
  router.delete(
    '/:id',
    validationHandler(PublisherId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        await publishers.delete(parseInt(id))
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    }
  )

  /** Attach the router to the express instance. */
  app.use('/api/publishers', router)
}
