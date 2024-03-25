import { createDatabase } from 'db0'
import connector, { type ConnectorOptions } from 'db0/connectors/libsql/node'
import { drizzle } from 'db0/integrations/drizzle/index'

const useDatabaseWithOptions = () => {
  const config = useRuntimeConfig()
  const connectionConfig: ConnectorOptions = {
    url: config.tursoConnectionUrl,
    authToken: config.tursoAuthToken,
  }
  return createDatabase(connector(connectionConfig))
}

export const useDrizzle = () => drizzle(useDatabaseWithOptions())
