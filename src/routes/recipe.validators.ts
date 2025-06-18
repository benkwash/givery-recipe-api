import { celebrate, Joi } from 'celebrate'

const customErrorMessages = {
  'string.base': 'Recipe creation failed!',
  'string.empty': 'Recipe creation failed!',
  'string.required': 'Recipe creation failed!',
  'number.base': 'Recipe creation failed!',
  'number.required': 'Recipe creation failed!',
  'any.required': 'Recipe creation failed!'
}
export const validateCreateRecipe = celebrate({
  body: Joi.object({
    title: Joi.string().required().messages(customErrorMessages),
    making_time: Joi.string().required().messages(customErrorMessages),
    serves: Joi.string().required().messages(customErrorMessages),
    ingredients: Joi.string().required().messages(customErrorMessages),
    cost: Joi.number().required().messages(customErrorMessages)
  }).required()
})

export const validateUpdateRecipe = celebrate({
  params: Joi.object({
    id: Joi.string().required()
  }),
  body: Joi.object({
    title: Joi.string().optional(),
    making_time: Joi.string().optional(),
    serves: Joi.string().optional(),
    ingredients: Joi.string().optional(),
    cost: Joi.number().optional()
  })
    .or('name', 'making_time', 'serves', 'ingredients', 'cost') //at least one field must be present
    .required()
})

export const validateGetRecipeById = celebrate({
  params: Joi.object({
    id: Joi.string().required()
  })
})

export const validateGetRecipes = celebrate({
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(100),
    sortBy: Joi.string().valid('name', 'cookingTime', 'cost').default('name'),
    sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
    search: Joi.string().optional()
  })
})

export const validateDeleteRecipe = celebrate({
  params: Joi.object({
    id: Joi.string().required()
  })
})
