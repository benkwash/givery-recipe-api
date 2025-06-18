import { create } from '../../repositories/recipe.repository'
import { Recipe } from './types'

export const createRecipe = async (recipe: Recipe) => {
  const createdRecipe = await create(recipe)

  if (!createdRecipe) {
    throw new Error('Recipe creation failed!')
  }

  return {
    ...createdRecipe,
    cost: createdRecipe.cost.toString(),
    id: createdRecipe.id.toString()
  }
}
