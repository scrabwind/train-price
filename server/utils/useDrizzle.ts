import { drizzle } from 'db0/integrations/drizzle/index'

export const useDrizzle = () => drizzle(useDatabase())
