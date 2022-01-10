import boom from '@hapi/boom'
import {
  createConnection,
  DeepPartial,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm'
import { Book } from '../models'

class BooksResource {
  /**
   * Insert a new book into the database.
   * @param data - Data to insert.
   * @returns - Recently inserted book.
   */
  async create(data: DeepPartial<Book>): Promise<Book> {
    const connection = await createConnection()
    const repository = connection.getRepository(Book)
    try {
      const book = repository.create(data)
      await repository.save(book)
      const createdBook = await repository.find({
        take: 1,
        order: { id: 'DESC' },
      })

      return createdBook[0]
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw boom.badRequest(error.message)
      } else {
        throw error
      }
    } finally {
      await connection.close()
    }
  }

  /**
   * Retrieve all books from the database.
   * @returns - All books.
   */
  async readAll(): Promise<Book[]> {
    const connection = await createConnection()
    const repository = connection.getRepository(Book)
    try {
      const books = await repository.find()

      return books
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw boom.badRequest(error.message)
      } else {
        throw error
      }
    } finally {
      await connection.close()
    }
  }

  /**
   * Retrieve an specific book from the database.
   * @param id - Book id
   * @returns - A book.
   */
  async readOne(id: number): Promise<Book> {
    const connection = await createConnection()
    const repository = connection.getRepository(Book)
    try {
      const book = await repository.findOneOrFail(id)

      return book
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw boom.notFound(error.message)
      } else if (error instanceof QueryFailedError) {
        throw boom.badRequest(error.message)
      } else {
        throw error
      }
    } finally {
      await connection.close()
    }
  }

  /**
   * Update an specific book into the database.
   * @param id - Book id.
   * @param data - Data to update.
   * @returns - Updated book.
   */
  async update(id: number, data: DeepPartial<Book>): Promise<Book> {
    const connection = await createConnection()
    const repository = connection.getRepository(Book)
    try {
      const book = await repository.findOneOrFail(id)
      repository.merge(book, data)
      repository.save(book)

      return book
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw boom.notFound(error.message)
      } else if (error instanceof QueryFailedError) {
        throw boom.badRequest(error.message)
      } else {
        throw error
      }
    } finally {
      await connection.close()
    }
  }

  /**
   * Remove an specific book from the database.
   * @param id - Book id.
   */
  async delete(id: number): Promise<void> {
    const connection = await createConnection()
    const repository = connection.getRepository(Book)
    try {
      const book = await repository.findOneOrFail(id)
      await repository.remove(book)
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw boom.notFound(error.message)
      } else if (error instanceof QueryFailedError) {
        throw boom.badRequest(error.message)
      } else {
        throw error
      }
    } finally {
      await connection.close()
    }
  }
}

export const books = new BooksResource()
