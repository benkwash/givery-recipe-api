import { Router } from 'express'
import { handleAsyncErrors } from '../utils/handle-async-errors'

import {
  createRecipe,
  updateRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe
} from '../controllers/recipe.controller'

import {
  validateCreateRecipe,
  validateUpdateRecipe,
  validateGetRecipes,
  validateGetRecipeById,
  validateDeleteRecipe
} from './recipe.validators'

const v1Routes = Router()
  .post('/', validateCreateRecipe, handleAsyncErrors(createRecipe))
  .patch('/:id', validateUpdateRecipe, handleAsyncErrors(updateRecipe))
  .get('/', validateGetRecipes, handleAsyncErrors(getRecipes))
  .get('/:id', validateGetRecipeById, handleAsyncErrors(getRecipeById))
  .delete('/:id', validateDeleteRecipe, handleAsyncErrors(deleteRecipe))

export const recipeRoutes = Router().use('/v1/recipes', v1Routes)
