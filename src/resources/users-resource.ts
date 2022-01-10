import boom from '@hapi/boom'
import {
  createConnection,
  DeepPartial,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm'
import { User } from '../models'

class UsersResource {
  async create(data: DeepPartial<User>): Promise<User | undefined> {
    const connection = await createConnection()
    const repository = connection.getRepository(User)
    try {
      const user = repository.create(data)
      await repository.save(user)
      const createdUser = await repository.find({
        take: 1,
        order: { id: 'DESC' },
      })
      const safeUser = createdUser[0].deletePassword()

      return safeUser
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

  async readAll(): Promise<User[] | undefined> {
    const connection = await createConnection()
    const repository = connection.getRepository(User)
    try {
      const users = await repository.find()
      const safeUsers = users.map((user) => user.deletePassword())

      return safeUsers
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

  async readOne(id: number): Promise<User | undefined> {
    const connection = await createConnection()
    const repository = connection.getRepository(User)
    try {
      const user = await repository.findOneOrFail(id)
      const safeUser = user.deletePassword()

      return safeUser
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

  async update(id: number, data: DeepPartial<User>): Promise<User | undefined> {
    const connection = await createConnection()
    const repository = connection.getRepository(User)
    try {
      const user = await repository.findOneOrFail(id)
      repository.merge(user, data)
      repository.save(user)
      const safeUser = user.deletePassword()

      return safeUser
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

  async delete(id: number): Promise<void> {
    const connection = await createConnection()
    const repository = connection.getRepository(User)
    try {
      const user = await repository.findOneOrFail(id)
      await repository.remove(user)
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

export const users = new UsersResource()
