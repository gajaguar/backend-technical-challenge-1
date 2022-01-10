import {
  authorsMock,
  booksMock,
  genresMock,
  publishersMock,
  usersMock,
} from 'database'
import { Express, NextFunction, Request, Response, Router } from 'express'
import { authors, books, genres, publishers, users } from '../resources'

const router = Router()

/**
 * Run seeders to populate database.
 * @param app - Express instance.
 */
export const populateRouter = (app: Express): void => {
  /** Generate an endpoint to create a author. */
  router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
      usersMock.forEach(async (user) => {
        await users.create(user)
      })
      authorsMock.forEach(async (author) => {
        await authors.create(author)
      })
      genresMock.forEach(async (genre) => {
        await genres.create(genre)
      })
      publishersMock.forEach(async (publisher) => {
        await publishers.create(publisher)
      })
      booksMock.forEach(async (book) => {
        await books.create(book)
      })
      res.status(201).json({ message: 'Database seeded' })
    } catch (err) {
      next(err)
    }
  })

  /** Attach the router to the express instance. */
  app.use('/api/populate', router)
}
