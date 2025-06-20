import express from 'express'
import cors from 'cors'
import pino from 'pino-http'
import { errors } from 'celebrate'
import { routes } from './routes'
import { logger } from './utils/logger'
import { errorMiddleware } from './middlewares/errors.middleware'

const log = logger({ loggerService: 'app' })
const loggerMiddleware = pino({
  logger: log
})

export const app = () =>
  express()
    .use(cors())
    .use(loggerMiddleware)
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(routes)
    .use(errorMiddleware)
    .use(errors())
