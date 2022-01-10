import Joi from 'joi'

/** id field schema */
const id = Joi.number().integer().required()

/** name field schema */
const name = Joi.string().min(5).max(100)

/** Schema for author creation. */
export const AuthorCreate = Joi.object({
  name: name.required(),
})

/** Schema for author update. */
export const AuthorUpdate = Joi.object({
  name: name,
})

/** Schema for id verification */
export const AuthorId = Joi.object({
  id: id.required(),
})
