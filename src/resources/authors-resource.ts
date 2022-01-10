import boom from '@hapi/boom'
import {
  createConnection,
  DeepPartial,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm'
import { Author } from '../models'

class AuthorsResource {
  /**
   * Insert a new author into the database.
   * @param data - Data to insert.
   * @returns - Recently inserted author.
   */
  async create(data: DeepPartial<Author>): Promise<Author> {
    const connection = await createConnection()
    const repository = connection.getRepository(Author)
    try {
      const author = repository.create(data)
      await repository.save(author)
      const createdAuthor = await repository.find({
        take: 1,
        order: { id: 'DESC' },
      })

      return createdAuthor[0]
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
   * Retrieve all authors from the database.
   * @returns - All authors.
   */
  async readAll(): Promise<Author[]> {
    const connection = await createConnection()
    const repository = connection.getRepository(Author)
    try {
      const authors = await repository.find()

      return authors
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
   * Retrieve an specific author from the database.
   * @param id - Author id
   * @returns - An author.
   */
  async readOne(id: number): Promise<Author> {
    const connection = await createConnection()
    const repository = connection.getRepository(Author)
    try {
      const author = await repository.findOneOrFail(id)

      return author
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
   * Update an specific author into the database.
   * @param id - Author id.
   * @param data - Data to update.
   * @returns - Updated author.
   */
  async update(id: number, data: DeepPartial<Author>): Promise<Author> {
    const connection = await createConnection()
    const repository = connection.getRepository(Author)
    try {
      const author = await repository.findOneOrFail(id)
      repository.merge(author, data)
      repository.save(author)

      return author
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
   * Remove an specific author from the database.
   * @param id - Author id.
   */
  async delete(id: number): Promise<void> {
    const connection = await createConnection()
    const repository = connection.getRepository(Author)
    try {
      const author = await repository.findOneOrFail(id)
      await repository.remove(author)
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

export const authors = new AuthorsResource()
