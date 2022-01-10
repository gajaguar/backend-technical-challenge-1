import { Express, NextFunction, Request, Response, Router } from 'express'
import { validationHandler } from 'network/middlewares'
import { BookCreate, BookId, BookUpdate } from 'schemas'
import { books } from '../resources'

const router = Router()

/**
 * Congifure the routes for the books resource.
 * @param app - Express instance.
 */
export const booksRouter = (app: Express): void => {
  /** Generate an endpoint to create a book. */
  router.post(
    '/',
    validationHandler(BookCreate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = req.body
        const result = await books.create(data)
        res.status(201).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to read all books. */
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await books.readAll()
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  })

  /** Generate an endpoint to read a book. */
  router.get(
    '/:id',
    validationHandler(BookId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const result = await books.readOne(parseInt(id))
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to update a book. */
  router.patch(
    '/:id',
    validationHandler(BookId, 'params'),
    validationHandler(BookUpdate),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        const data = req.body
        const result = await books.update(parseInt(id), data)
        res.status(200).json(result)
      } catch (err) {
        next(err)
      }
    }
  )

  /** Generate an endpoint to delete a book. */
  router.delete(
    '/:id',
    validationHandler(BookId, 'params'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params
        await books.delete(parseInt(id))
        res.status(204).end()
      } catch (err) {
        next(err)
      }
    }
  )

  /** Attach the router to the express instance. */
  app.use('/api/books', router)
}
