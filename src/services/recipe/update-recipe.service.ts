import { update, findById, find } from '../../repositories/recipe.repository'
import { deleteCache } from '../../utils/cache'
import { Recipe } from './types'
import { recipeNotFoundError } from '../../utils/errors'

export const updateRecipe = async (id: string, recipeData: Partial<Recipe>) => {
  const updatedRecipe = await update(id, recipeData)

  if (updatedRecipe) {
    deleteCache(`recipe:${id}`)
  }

  if (updatedRecipe.changes === 0) {
    throw recipeNotFoundError()
  }

  const recipe = await findById(id)

  return {
    title: recipe.title,
    making_time: recipe.making_time,
    serves: recipe.serves,
    ingredients: recipe.ingredients,
    cost: recipe.cost.toString()
  }
}
