import Joi from 'joi'

/** id field schema */
const id = Joi.number().integer().required()

/** name field schema */
const name = Joi.string().min(5).max(100)

/** Schema for genre creation. */
export const GenreCreate = Joi.object({
  name: name.required(),
})

/** Schema for genre update. */
export const GenreUpdate = Joi.object({
  name: name,
})

/** Schema for id verification */
export const GenreId = Joi.object({
  id: id.required(),
})
