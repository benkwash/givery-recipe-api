export type Recipe = {
  title: string
  making_time: string
  serves: string
  ingredients: string
  cost: number
}

export type RecipeWithIdAndTimestamps = Recipe & {
  id: number
  created_at: string
  updated_at: string
}
