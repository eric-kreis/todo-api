import Joi from 'joi';

const userSchemas = {
  create: Joi.object({
    name: Joi.string().max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  update: Joi.object({
    name: Joi.string().max(20),
    email: Joi.string().email(),
  }),

  signin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export default userSchemas;
