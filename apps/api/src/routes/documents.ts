import { z } from 'zod'
import { router, publicProcedure } from '.'

export const documentsRouter = router({
  list: publicProcedure.query(async () => {
    // TODO: Integrate with database
    return [
      {
        id: '1',
        name: 'HIPAA Privacy Policy',
        status: 'processed',
        uploadedAt: new Date('2024-01-15'),
        processedAt: new Date('2024-01-15'),
        gameCount: 3
      },
      {
        id: '2',
        name: 'Code of Conduct',
        status: 'processed',
        uploadedAt: new Date('2024-01-10'),
        processedAt: new Date('2024-01-10'),
        gameCount: 2
      }
    ]
  }),

  upload: publicProcedure
    .input(
      z.object({
        name: z.string(),
        content: z.string(),
        type: z.enum(['pdf', 'doc', 'docx', 'txt'])
      })
    )
    .mutation(async ({ input }) => {
      // TODO: Store file in S3/MinIO
      // TODO: Queue for AI processing
      // TODO: Save to database
      
      console.log(`Processing document: ${input.name}`)
      
      return {
        id: Date.now().toString(),
        name: input.name,
        status: 'processing',
        uploadedAt: new Date(),
        message: 'Document uploaded successfully and queued for processing'
      }
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      // TODO: Fetch from database
      return {
        id: input.id,
        name: 'Sample Document',
        status: 'processed',
        uploadedAt: new Date(),
        processedAt: new Date(),
        content: 'Document content preview...',
        gameCount: 2
      }
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      // TODO: Delete from database and storage
      console.log(`Deleting document: ${input.id}`)
      return { success: true, message: 'Document deleted successfully' }
    })
})