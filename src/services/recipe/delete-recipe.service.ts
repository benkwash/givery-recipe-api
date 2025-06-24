import { remove } from '../../repositories/recipe.repository'
import { deleteCache } from '../../utils/cache'
import { recipeNotFoundError } from '../../utils/errors'

export const deleteRecipe = async (id: string) => {
  const deletedRecipe = await remove(id)

  if (deletedRecipe) {
    deleteCache(`recipe:${id}`)
  }

  if (deletedRecipe.changes === 0) {
    throw recipeNotFoundError()
  }
  return deletedRecipe
}
