import Joi from 'joi';

const taskSchemas = {
  create: Joi.object({
    text: Joi.string().required(),
    status: Joi.string().valid('todo', 'doing', 'done').required(),
    userId: Joi.string().required(),
  }),

  update: Joi.object({
    text: Joi.string(),
    status: Joi.string().valid('todo', 'doing', 'done'),
  }),
};

export default taskSchemas;
