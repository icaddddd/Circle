import * as Joi from "Joi"

export const createThreadsSchema = Joi.object().keys({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export const loginThreadSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

