import { NextFunction, Request, Response } from 'express'
import { logger } from './logger'

const log = logger({ loggerService: 'asyncErrors' })

export const handleAsyncErrors =
  // eslint-disable-next-line @typescript-eslint/ban-types
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      log.error(error)
      next(error)
    }
  }
