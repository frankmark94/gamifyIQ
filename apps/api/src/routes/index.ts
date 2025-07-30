import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { Context } from '../context'
import { documentsRouter } from './documents'
import { gamesRouter } from './games'
import { usersRouter } from './users'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

export const appRouter = router({
  health: publicProcedure.query(() => {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      service: 'GamifyIQ API'
    }
  }),
  documents: documentsRouter,
  games: gamesRouter,
  users: usersRouter,
})

export type AppRouter = typeof appRouter