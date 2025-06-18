import { notFoundError } from './http-exception'

export const recipeNotFoundError = () => {
  throw notFoundError({
    message: 'No recipe found'
  })
}
