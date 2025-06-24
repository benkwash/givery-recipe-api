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
      return next(error)
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
