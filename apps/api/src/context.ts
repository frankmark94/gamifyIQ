import { CreateExpressContextOptions } from '@trpc/server/adapters/express'

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  return {
    req,
    res,
    user: null, // TODO: Add auth context
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>