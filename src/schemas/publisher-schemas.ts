import Joi from 'joi'

/** id field schema */
const id = Joi.number().integer().required()

/** name field schema */
const name = Joi.string().min(5).max(100)

/** Schema for publisher creation. */
export const PublisherCreate = Joi.object({
  name: name.required(),
})

/** Schema for publisher update. */
export const PublisherUpdate = Joi.object({
  name: name,
})

/** Schema for id verification */
export const PublisherId = Joi.object({
  id: id.required(),
})
