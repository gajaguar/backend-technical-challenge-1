import boom from '@hapi/boom'
import {
  createConnection,
  DeepPartial,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm'
import { Genre } from '../models'

class GenresResource {
  /**
   * Insert a new genre into the database.
   * @param data - Data to insert.
   * @returns - Recently inserted genre.
   */
  async create(data: DeepPartial<Genre>): Promise<Genre> {
    const connection = await createConnection()
    const repository = connection.getRepository(Genre)
    try {
      const genre = repository.create(data)
      await repository.save(genre)
      const createdGenre = await repository.find({
        take: 1,
        order: { id: 'DESC' },
      })

      return createdGenre[0]
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
   * Retrieve all genres from the database.
   * @returns - All genres.
   */
  async readAll(): Promise<Genre[]> {
    const connection = await createConnection()
    const repository = connection.getRepository(Genre)
    try {
      const genres = await repository.find()

      return genres
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
   * Retrieve an specific genre from the database.
   * @param id - Genre id
   * @returns - A genre.
   */
  async readOne(id: number): Promise<Genre> {
    const connection = await createConnection()
    const repository = connection.getRepository(Genre)
    try {
      const genre = await repository.findOneOrFail(id)

      return genre
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
   * Update an specific genre into the database.
   * @param id - Genre id.
   * @param data - Data to update.
   * @returns - Updated genre.
   */
  async update(id: number, data: DeepPartial<Genre>): Promise<Genre> {
    const connection = await createConnection()
    const repository = connection.getRepository(Genre)
    try {
      const genre = await repository.findOneOrFail(id)
      repository.merge(genre, data)
      repository.save(genre)

      return genre
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
   * Remove an specific genre from the database.
   * @param id - Genre id.
   */
  async delete(id: number): Promise<void> {
    const connection = await createConnection()
    const repository = connection.getRepository(Genre)
    try {
      const genre = await repository.findOneOrFail(id)
      await repository.remove(genre)
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

export const genres = new GenresResource()
