import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { isCelebrateError } from 'celebrate'
import { HttpException } from '../utils/http-exception'

const log = logger({
  loggerService: 'error'
})

const ErrorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (isCelebrateError(error)) {
      const details =
        error.details.get('body') ||
        error.details.get('params') ||
        error.details.get('query')

      const message = details?.details[0]?.message || 'Validation failed'

      const NEW_RECIPE_VALIDATION_ERROR = 'Recipe creation failed!'
      const status = message === NEW_RECIPE_VALIDATION_ERROR ? 200 : 400
      const validationMsg =
        message === NEW_RECIPE_VALIDATION_ERROR
          ? {
              required: 'title, making_time, serves, ingredients, cost'
            }
          : {}

      return res.status(status).json({
        message,
        ...validationMsg
      })
    }

    const status: number = error.status || 500

    let message: string = error.message || 'Something went wrong'

    log.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}, Stack:: ${error.stack}`
    )

    return res.status(status).json({ message })
  } catch (error) {
    next(error)
  }
}

export type MiddlewareType = (
  _req: Request,
  _res: Response,
  _next: NextFunction
) => void

export const errorMiddleware = ErrorMiddleware as unknown as MiddlewareType
