import { dbClient } from '../config/db'
import { Recipe, RecipeWithIdAndTimestamps } from '../usecases/recipe/types'

const COLLECTION_NAME = 'recipes'

export const find = async (): Promise<Array<Recipe>> => {
  const sql = `
    SELECT id, title, making_time, serves, ingredients, cost
    FROM ${COLLECTION_NAME}
    ORDER BY created_at DESC
  `
  return (await dbClient.prepare(sql).all()) as Array<Recipe>
}

export const findById = async (
  id: string
): Promise<RecipeWithIdAndTimestamps> => {
  const sql = `
    SELECT *
    FROM ${COLLECTION_NAME}
    WHERE id = ?
  `
  const recipe = (await dbClient
    .prepare(sql)
    .get(id)) as RecipeWithIdAndTimestamps

  return recipe
}

export const create = async (recipe: Recipe) => {
  const sql = `
    INSERT INTO ${COLLECTION_NAME} (title, making_time, serves, ingredients, cost)
    VALUES (?, ?, ?, ?, ?)
  `
  const newRecipe = await dbClient
    .prepare(sql)
    .run(
      recipe.title,
      recipe.making_time,
      recipe.serves,
      recipe.ingredients,
      recipe.cost
    )

  return findById(newRecipe.lastInsertRowid.toString())
}

export const update = (id: string, recipe: Partial<Recipe>) => {
  const fields = Object.keys(recipe)
    .filter((key) => {
      const recipeKeyVal = recipe[key as keyof Recipe]
      return recipeKeyVal !== undefined && recipeKeyVal !== null
    })
    .map((key) => `${key} = ?`)
    .join(', ')
  const values = Object.values(recipe).filter(
    (value) => value !== undefined && value !== null
  )

  const sql = `
    UPDATE ${COLLECTION_NAME}
    SET ${fields}
    WHERE id = ?
  `
  return dbClient.prepare(sql).run(...values, id)
}

export const remove = (id: string) => {
  const sql = `
    DELETE FROM ${COLLECTION_NAME}
    WHERE id = ?
  `
  return dbClient.prepare(sql).run(id)
}
