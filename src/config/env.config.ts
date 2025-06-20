const { PORT, NODE_ENV = 'development' } = process.env

if (!PORT || !NODE_ENV) {
  throw new Error('Some environment variables missing')
}

export const env = {
  NODE_SERVER_PORT: parseInt(PORT, 10),
  NODE_ENV,
  isProduction: NODE_ENV === 'production',
  isDevelopment: NODE_ENV === 'development',
  isTest: NODE_ENV === 'test'
}
