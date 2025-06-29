import { Router, Request, Response } from 'express'
import { recipeRoutes } from './routes/recipe.routes'
import { HTTP_STATUS } from './utils/http-response-statuses'

export const routes = Router()
  .use('/health', async (_req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK).json({
      status: 'alive'
    })
  })
  .use(recipeRoutes)
