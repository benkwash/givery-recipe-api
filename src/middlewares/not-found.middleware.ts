import { Request, Response } from 'express'

export const notFoundMiddleware = (_req: Request, res: Response) => {
  res.status(404).json({
    message: 'Not Found'
  })
}
