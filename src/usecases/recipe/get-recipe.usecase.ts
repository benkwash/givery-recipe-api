import { find, findById, update } from '../../repositories/recipe.repository'
import { setCache, getCache } from '../../utils/cache'

export const getRecipes = async () => {
  const recipes = await find()

  return recipes.map(({ cost, ...rest }) => ({
    ...rest,
    cost: cost.toString()
  }))
}

export const getRecipeById = async (id: string) => {
  const cachedRecipe = getCache(`recipe:${id}`)
  if (cachedRecipe) {
    return cachedRecipe
  }

  const recipe = await findById(id)

  if (!recipe) return

  const recipeRes = {
    id: recipe.id,
    title: recipe.title,
    making_time: recipe.making_time,
    serves: recipe.serves,
    ingredients: recipe.ingredients,
    cost: recipe.cost.toString()
  }

  setCache(`recipe:${id}`, recipeRes)

  return recipeRes
}
