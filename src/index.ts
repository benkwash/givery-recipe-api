import 'dotenv/config'
import { app } from './app'
import { env } from './config/env.config'
import { initDb } from './config/db/init-db'
import { seedDb } from './config/db/seed-db'
import { closeDb } from './config/db'
import { logger } from './utils/logger'

const log = logger({ loggerService: 'server' })

const { NODE_SERVER_PORT } = env

async function init() {
  try {
    await initDb()
    await seedDb()
    log.info('Database initialized and seeded successfully')
    await app().listen(NODE_SERVER_PORT, () => {
      log.info(`App Started. Server is running on port ${NODE_SERVER_PORT}`)
    })
  } catch (error) {
    log.error(`An error occurred:, ${error}`)
    await closeDb()
  }
}

init()
