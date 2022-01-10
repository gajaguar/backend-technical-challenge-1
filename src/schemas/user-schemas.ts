import Joi from 'joi'

/** id field schema */
const id = Joi.number().integer()

/** email field schema */
const email = Joi.string().email()

/** password field schema */
const password = Joi.string().min(8)

/** Schema for user creation. */
export const UserCreate = Joi.object({
  email: email.required(),
  password: password.required(),
})

/** Schema for user update. */
export const UserUpdate = Joi.object({
  id: id,
  email: email,
  password: password,
})

/** Schema for id verification */
export const UserId = Joi.object({
  id: id.required(),
})
