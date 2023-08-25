import * as Joi from "Joi"

export const createThreadsSchema = Joi.object({
    content: Joi.string(),
    image: Joi.string()
})

export const loginThreadSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

