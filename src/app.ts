import express from 'express'
import pino from 'pino-http'
import { errors } from 'celebrate'
import { routes } from './routes'
import { logger } from './utils/logger'

const log = logger({ loggerService: 'app' })
const loggerMiddleware = pino({
  logger: log
})

export const app = () =>
  express()
    .use(loggerMiddleware)
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(routes)
    .use(errors())
