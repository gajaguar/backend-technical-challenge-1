import Joi from 'joi'

/** id field schema */
const id = Joi.number().integer()

/** email field schema */
const name = Joi.string().min(5).max(100)

/** author id field schema */
const authorId = Joi.number().integer()

/** publisher id field schema */
const publisherId = Joi.number().integer()

/** genre id field schema */
const genreId = Joi.number().integer()

/** isbn field schema */
const isbn = Joi.string().length(36)

/** Schema for book creation. */
export const BookCreate = Joi.object({
  name: name.required(),
  authorId: authorId.required(),
  publisherId: publisherId,
  genreId: genreId,
  isbn: isbn.required(),
})

/** Schema for book update. */
export const BookUpdate = Joi.object({
  id: id,
  name: name,
  authorId: authorId,
  publisherId: publisherId,
  genreId: genreId,
  isbn: isbn,
})

/** Schema for id verification */
export const BookId = Joi.object({
  id: id.required(),
})
