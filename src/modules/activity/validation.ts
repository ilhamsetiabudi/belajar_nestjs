import * as joi from 'joi';

export const createActivity = joi.object().keys({
  email: joi.string().required().messages({
    'any.required': `email cannot be null`,
  }),
  title: joi.string().required().messages({
    'any.required': `title cannot be null`,
  }),
});

export const updateActivity = joi.object().keys({
  title: joi.string().required().messages({
    'any.required': `title cannot be null`,
  }),
});
