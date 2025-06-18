import DB from 'better-sqlite3'

export const dbClient = new DB(':memory:') // In-memory database

export const closeDb = () => {
  if (dbClient) {
    dbClient.close()
  }
}
