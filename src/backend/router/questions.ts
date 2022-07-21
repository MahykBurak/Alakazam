import * as trpc from '@trpc/server'
import { z } from 'zod'
import { prisma } from '../../db/client'

export const QuestionRouter = trpc
  .router()
  .query('get-all', {
    async resolve() {
      return await prisma.question.findMany()
    },
  })
  .mutation('create', {
    input: z.object({
      question: z.string().min(5).max(900),
    }),
    async resolve({ input }) {
      return await prisma.question.create({
        data: {
          question: input.question,
        },
      })
    },
  })
