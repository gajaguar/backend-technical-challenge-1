import faker from 'faker'
import { User } from '../../models'
import { createConnection } from 'typeorm'

export const userSeeder = async (quantity: number): Promise<void> => {
  const connection = await createConnection()
  const repository = connection.getRepository(User)

  for (let i = 0; i < quantity; i++) {
    const user = new User()
    user.name = faker.name.findName()
    user.email = faker.internet.email()
    user.password = faker.internet.password()
    await repository.save(user)
  }
}
