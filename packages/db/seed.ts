import { PrismaClient, UserRole, DocumentStatus, GameStatus, DifficultyLevel } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@gamifyiq.com' },
    update: {},
    create: {
      email: 'admin@gamifyiq.com',
      name: 'System Administrator',
      role: UserRole.ADMIN,
    },
  })

  // Create sample employees
  const employee1 = await prisma.user.upsert({
    where: { email: 'john.doe@company.com' },
    update: {},
    create: {
      email: 'john.doe@company.com',
      name: 'John Doe',
      role: UserRole.EMPLOYEE,
    },
  })

  const employee2 = await prisma.user.upsert({
    where: { email: 'jane.smith@company.com' },
    update: {},
    create: {
      email: 'jane.smith@company.com',
      name: 'Jane Smith',
      role: UserRole.EMPLOYEE,
    },
  })

  // Create sample documents
  const hipaaDoc = await prisma.document.create({
    data: {
      name: 'HIPAA Privacy Policy',
      originalName: 'hipaa-privacy-policy.pdf',
      content: 'This document outlines the HIPAA privacy requirements and guidelines for handling protected health information...',
      fileSize: 1024000,
      mimeType: 'application/pdf',
      status: DocumentStatus.PROCESSED,
      storageUrl: '/documents/hipaa-privacy-policy.pdf',
      processedAt: new Date(),
      uploadedById: adminUser.id,
    },
  })

  const codeOfConductDoc = await prisma.document.create({
    data: {
      name: 'Code of Conduct',
      originalName: 'code-of-conduct.pdf',
      content: 'This document outlines the expected behavior and ethical standards for all employees...',
      fileSize: 2048000,
      mimeType: 'application/pdf',
      status: DocumentStatus.PROCESSED,
      storageUrl: '/documents/code-of-conduct.pdf',
      processedAt: new Date(),
      uploadedById: adminUser.id,
    },
  })

  // Create sample games
  const hipaaGame = await prisma.game.create({
    data: {
      title: 'HIPAA Privacy Training',
      description: 'Interactive scenarios to test your understanding of HIPAA privacy requirements',
      status: GameStatus.ACTIVE,
      difficulty: DifficultyLevel.MEDIUM,
      totalPoints: 500,
      estimatedDuration: 15,
      documentId: hipaaDoc.id,
    },
  })

  const conductGame = await prisma.game.create({
    data: {
      title: 'Code of Conduct Quiz',
      description: 'Workplace behavior and ethics scenarios',
      status: GameStatus.ACTIVE,
      difficulty: DifficultyLevel.EASY,
      totalPoints: 400,
      estimatedDuration: 12,
      documentId: codeOfConductDoc.id,
    },
  })

  // Create sample scenarios for HIPAA game
  await prisma.gameScenario.createMany({
    data: [
      {
        gameId: hipaaGame.id,
        title: 'Patient Information Request',
        description: 'A colleague asks you to share patient information over email for a consultation.',
        question: 'What should you do?',
        options: [
          'Share the information immediately to help the patient',
          'Use secure, encrypted communication channels',
          'Ask the patient for permission first',
          'Decline to share any information'
        ],
        correctAnswer: 1,
        explanation: 'HIPAA requires the use of secure, encrypted communication when sharing PHI.',
        points: 100,
        difficulty: DifficultyLevel.MEDIUM,
        topic: 'Information Sharing',
        order: 1,
      },
      {
        gameId: hipaaGame.id,
        title: 'PHI Storage',
        description: 'You need to store patient records on your computer for quick access.',
        question: 'What is the proper way to store PHI?',
        options: [
          'Save files on desktop for easy access',
          'Use encrypted storage with access controls',
          'Store in cloud drive for backup',
          'Keep printed copies in desk drawer'
        ],
        correctAnswer: 1,
        explanation: 'PHI must be stored using encrypted storage with proper access controls.',
        points: 100,
        difficulty: DifficultyLevel.MEDIUM,
        topic: 'Data Storage',
        order: 2,
      }
    ]
  })

  // Create sample scenarios for Code of Conduct game
  await prisma.gameScenario.createMany({
    data: [
      {
        gameId: conductGame.id,
        title: 'Workplace Harassment',
        description: 'You witness a colleague making inappropriate comments to a team member.',
        question: 'What is the most appropriate action?',
        options: [
          'Ignore it if it\'s not directed at you',
          'Tell your colleague to stop privately',
          'Report it to HR or management',
          'Join in to fit in with the team'
        ],
        correctAnswer: 2,
        explanation: 'Workplace harassment should be reported to HR or management immediately.',
        points: 100,
        difficulty: DifficultyLevel.EASY,
        topic: 'Harassment Prevention',
        order: 1,
      }
    ]
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Created users: ${adminUser.name}, ${employee1.name}, ${employee2.name}`)
  console.log(`📄 Created documents: ${hipaaDoc.name}, ${codeOfConductDoc.name}`)
  console.log(`🎮 Created games: ${hipaaGame.title}, ${conductGame.title}`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })