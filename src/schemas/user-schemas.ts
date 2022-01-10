import Joi from 'joi'

/** id field */
const id = Joi.number().integer().required()

/** email field base schema */
const email = Joi.string().email()
const password = Joi.string().min(8)

/** Schema for user creation. */
export const UserCreate = Joi.object({
  email: email.required(),
  password: password.required(),
})

/** Schema for user update. */
export const UserUpdate = Joi.object({
  email: email,
  password: password,
})

/** Schema for user response. */
export const UserOut = Joi.object({
  id: id.required(),
  email: email.required(),
})

/** Schema for id verification */
export const UserId = Joi.object({
  id: id.required(),
})
