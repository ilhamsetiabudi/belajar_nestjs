import * as joi from 'joi';

export const createTodo = joi.object().keys({
  activity_group_id: joi.number().required().messages({
    'any.required': `activity_group_id cannot be null`,
  }),
  title: joi.string().required().messages({
    'any.required': `title cannot be null`,
  }),
});

export const updateTodo = joi.object().keys({
  title: joi.string().required().messages({
    'any.required': `title cannot be null`,
  }),
});
