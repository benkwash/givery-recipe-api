import { NextFunction, Request, Response } from 'express'
import { logger } from '../utils/logger'
import { isCelebrateError } from 'celebrate'
import { HttpException } from '../utils/http-exception'

const log = logger({
  loggerService: 'error'
})

export const errorMiddleware = (
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

    res.status(status).json({ message })
  } catch (error) {
    next(error)
  }
}
