import pino, { LoggerOptions } from 'pino'
import { env } from '../config/env.config'

const { isTest } = env

interface LoggerParams {
  loggerService?: string
  enabled?: boolean
}

export const logger = ({
  loggerService = 'api',
  enabled
}: LoggerParams = {}) => {
  const options: LoggerOptions = {
    timestamp: pino.stdTimeFunctions.isoTime,
    name: loggerService,
    enabled: enabled ?? !isTest
  }

  return pino(options)
}
