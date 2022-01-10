import boom from '@hapi/boom'
import {
  createConnection,
  DeepPartial,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm'
import { Publisher } from '../models'

class PublishersResource {
  /**
   * Insert a new publisher into the database.
   * @param data - Data to insert.
   * @returns - Recently inserted publisher.
   */
  async create(data: DeepPartial<Publisher>): Promise<Publisher> {
    const connection = await createConnection()
    const repository = connection.getRepository(Publisher)
    try {
      const publisher = repository.create(data)
      await repository.save(publisher)
      const createdPublisher = await repository.find({
        take: 1,
        order: { id: 'DESC' },
      })

      return createdPublisher[0]
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
   * Retrieve all publishers from the database.
   * @returns - All publishers.
   */
  async readAll(): Promise<Publisher[]> {
    const connection = await createConnection()
    const repository = connection.getRepository(Publisher)
    try {
      const publishers = await repository.find()

      return publishers
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
   * Retrieve an specific publisher from the database.
   * @param id - Publisher id
   * @returns - A publisher.
   */
  async readOne(id: number): Promise<Publisher> {
    const connection = await createConnection()
    const repository = connection.getRepository(Publisher)
    try {
      const publisher = await repository.findOneOrFail(id)

      return publisher
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
   * Update an specific publisher into the database.
   * @param id - Publisher id.
   * @param data - Data to update.
   * @returns - Updated publisher.
   */
  async update(id: number, data: DeepPartial<Publisher>): Promise<Publisher> {
    const connection = await createConnection()
    const repository = connection.getRepository(Publisher)
    try {
      const publisher = await repository.findOneOrFail(id)
      repository.merge(publisher, data)
      repository.save(publisher)

      return publisher
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
   * Remove an specific publisher from the database.
   * @param id - Publisher id.
   */
  async delete(id: number): Promise<void> {
    const connection = await createConnection()
    const repository = connection.getRepository(Publisher)
    try {
      const publisher = await repository.findOneOrFail(id)
      await repository.remove(publisher)
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

export const publishers = new PublishersResource()
