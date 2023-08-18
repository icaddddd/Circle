import * as Joi from "Joi"

export const createThreadsSchema = Joi.object({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const loginThreadSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

