import Joi = require("joi");

export const createThreadsSchema = Joi.object({
    content: Joi.string(),
    image: Joi.string()
})

export const loginThreadSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const registerThreadSchema = Joi.object({
    fullname: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

