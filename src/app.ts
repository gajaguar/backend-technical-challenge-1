import express, { Express, json, urlencoded } from 'express'
import { boomErrorHandler, errorHandler, errorLogger } from './network'
import {
  authorsRouter,
  booksRouter,
  genresRouter,
  populateRouter,
  publishersRouter,
  usersRouter,
} from './routers'

/**
 * This is an application factory function.
 * @returns - An application instance.
 */
export default (): Express => {
  const app = express()

  app.use(json())
  app.use(urlencoded({ extended: false }))

  // routes
  app.get('/', (req, res) => res.send('Hello World!'))
  authorsRouter(app)
  booksRouter(app)
  genresRouter(app)
  populateRouter(app)
  publishersRouter(app)
  usersRouter(app)

  // middlewares
  app.use(errorLogger)
  app.use(boomErrorHandler)
  app.use(errorHandler)

  return app
}
