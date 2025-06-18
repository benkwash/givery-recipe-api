import { Request, Response } from 'express'
import { HTTP_STATUS } from '../utils/http-response-statuses'

import {
  createRecipe as createRecipeUsecase,
  updateRecipe as updateRecipeUsecase,
  getRecipes as getRecipesUsecase,
  getRecipeById as getRecipeByIdUsecase,
  deleteRecipe as deleteRecipeUsecase
} from '../usecases/recipe'

export const createRecipe = async (req: Request, res: Response) => {
  const { title, making_time, serves, ingredients, cost } = req.body

  const recipe = await createRecipeUsecase({
    title,
    making_time,
    serves,
    ingredients,
    cost
  })

  return res.status(HTTP_STATUS.OK).json({
    message: 'Recipe created successfully',
    data: [recipe]
  })
}

export const updateRecipe = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { title, making_time, serves, ingredients, cost }
  } = req

  const updatedRecipe = await updateRecipeUsecase(id, {
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
  const recipes = await getRecipesUsecase()

  return res.status(HTTP_STATUS.OK).json({
    recipes
  })
}

export const getRecipeById = async (req: Request, res: Response) => {
  const recipe = await getRecipeByIdUsecase(req.params.id)

  return res.status(HTTP_STATUS.OK).json({
    message: `Recipe details by id`,
    recipe: [recipe]
  })
}

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params

  await deleteRecipeUsecase(id)

  return res.status(HTTP_STATUS.OK).json({
    message: `Recipe successfully deleted!`
  })
}
