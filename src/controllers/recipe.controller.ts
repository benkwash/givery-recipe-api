import { Request, Response } from 'express'
import { HTTP_STATUS } from '../utils/http-response-statuses'

import {
  createRecipe as createRecipeService,
  updateRecipe as updateRecipeService,
  getRecipes as getRecipesService,
  getRecipeById as getRecipeByIdService,
  deleteRecipe as deleteRecipeService
} from '../services/recipe'

export const createRecipe = async (req: Request, res: Response) => {
  const { title, making_time, serves, ingredients, cost } = req.body

  const recipe = await createRecipeService({
    title,
    making_time,
    serves,
    ingredients,
    cost
  })

  return res.status(HTTP_STATUS.OK).json({
    message: 'Recipe successfully created!',
    recipe: [recipe]
  })
}

export const updateRecipe = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { title, making_time, serves, ingredients, cost }
  } = req

  const updatedRecipe = await updateRecipeService(id, {
    title,
    making_time,
    serves,
    ingredients,
    cost
  })
  return res.status(HTTP_STATUS.OK).json({
    message: `Recipe successfully updated!`,
    data: [updatedRecipe]
  })
}

export const getRecipes = async (req: Request, res: Response) => {
  const recipes = await getRecipesService()

  return res.status(HTTP_STATUS.OK).json({
    recipes
  })
}

export const getRecipeById = async (req: Request, res: Response) => {
  const recipe = await getRecipeByIdService(req.params.id)

  return res.status(HTTP_STATUS.OK).json({
    message: `Recipe details by id`,
    recipe: [recipe]
  })
}

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params

  await deleteRecipeService(id)

  return res.status(HTTP_STATUS.OK).json({
    message: `Recipe successfully deleted!`
  })
}
