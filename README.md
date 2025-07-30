<img width="462" height="456" alt="image" src="https://github.com/user-attachments/assets/70da6de6-3bea-4aae-8686-db9a2d4e7ee0" />


> GenAI-powered SaaS platform that transforms corporate documents into gamified training modules

GamifyIQ ingests corporate documents (like codes of conduct, HIPAA policies, etc.) and uses AI to create engaging, interactive training games that improve employee learning and compliance.

## 🏗️ Architecture

This is a modular monorepo built with:

- **Frontend**: React with Tailwind CSS and Vite
- **Backend**: Node.js with Express and tRPC for type-safe APIs
- **AI Engine**: LangChain/OpenAI integration for document processing
- **Database**: PostgreSQL with Prisma ORM
- **Storage**: S3-compatible file storage (MinIO for local dev)
- **Cache**: Redis for sessions and caching
- **Auth**: Ready for Clerk or NextAuth integration
- **Infrastructure**: Docker-based development environment

## 📁 Project Structure

```
gamifyIQ/
├── apps/
│   ├── web/                    # React frontend
│   └── api/                    # Node.js backend
├── packages/
│   ├── ai-core/               # LangChain/OpenAI wrapper
│   ├── utils/                 # Shared utilities and types
│   └── db/                    # Prisma schema and client
├── docker-compose.yml         # Local development services
└── package.json              # Workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 9+
- Docker and Docker Compose
- OpenAI API Key (for AI features)

### 1. Clone and Install

```bash
git clone <repository-url>
cd gamifyIQ
npm run install:all
```

### 2. Environment Setup

Create environment files:

```bash
# Root .env
cp .env.example .env

# API environment
cp apps/api/.env.example apps/api/.env

# Web environment  
cp apps/web/.env.example apps/web/.env
```

Add your OpenAI API key to `apps/api/.env`:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start Development Environment

```bash
# Start all services (database, storage, cache)
npm run docker:up

# In another terminal, start the applications
npm run dev
```

This will start:
- 🌐 **Web App**: http://localhost:3000
- 🔌 **API Server**: http://localhost:4000
- 🐘 **PostgreSQL**: localhost:5432
- 🗄️ **MinIO Console**: http://localhost:9001
- 📊 **Redis**: localhost:6379

### 4. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

## 🎮 Features

### Current Implementation

- **Document Upload**: Drag-and-drop interface for corporate documents
- **AI Processing**: Automated analysis and scenario generation
- **Interactive Games**: Multiple-choice scenarios with scoring
- **Admin Dashboard**: User management and analytics
- **Progress Tracking**: Individual and company-wide metrics

### Placeholder Pages

- **Upload Document** (`/upload`): File upload with progress tracking
- **Play Game** (`/play`): Interactive training scenarios
- **Admin Dashboard** (`/admin`): Analytics and user management

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start both web and api in development
npm run dev:web         # Start only web frontend  
npm run dev:api         # Start only api server

# Building
npm run build           # Build all packages
npm run build:web       # Build web frontend
npm run build:api       # Build api server

# Database
npm run db:generate     # Generate Prisma client
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with sample data

# Docker
npm run docker:up       # Start all services
npm run docker:down     # Stop all services
```

### Package Development

Each package can be developed independently:

```bash
# AI Core package
cd packages/ai-core
npm run dev

# Utils package  
cd packages/utils
npm run build

# Database package
cd packages/db
npm run studio          # Open Prisma Studio
```

## 🔧 Configuration

### Environment Variables

**API (apps/api/.env)**:
```env
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://gamifyiq:gamifyiq_dev_password@localhost:5432/gamifyiq
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your_key_here
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=gamifyiq
MINIO_SECRET_KEY=gamifyiq_minio_password
```

**Web (apps/web/.env)**:
```env
VITE_API_URL=http://localhost:4000
```

### Database Schema

The Prisma schema includes:
- **Users**: Employee management with roles
- **Documents**: Corporate policy storage
- **Games**: Generated training modules
- **GameScenarios**: Individual questions/scenarios
- **GameSessions**: User progress tracking
- **SessionAnswers**: Detailed response data

## 🤖 AI Integration

GamifyIQ uses LangChain and OpenAI to:

1. **Analyze Documents**: Extract key topics and compliance requirements
2. **Generate Scenarios**: Create realistic workplace situations
3. **Adapt Difficulty**: Adjust complexity based on content
4. **Provide Explanations**: Educational feedback for answers

### Customizing AI Behavior

Modify prompts in `packages/ai-core/src/prompts/`:
- `DOCUMENT_ANALYSIS_PROMPT`: Document processing
- `SCENARIO_GENERATION_PROMPT`: Game creation
- `QUESTION_REFINEMENT_PROMPT`: Quality improvement

## 🚀 Production Deployment

### AWS Deployment Preparation

The scaffold is designed for easy AWS deployment:

- **Frontend**: Deploy to CloudFront + S3
- **Backend**: ECS or Lambda deployment
- **Database**: RDS PostgreSQL
- **Storage**: S3 for document storage
- **Cache**: ElastiCache Redis

### Build for Production

```bash
npm run build
npm run build:api
npm run build:web
```

## 🔐 Security Considerations

- Environment variables for sensitive data
- File upload validation and scanning
- Database connection security
- API rate limiting (implement as needed)
- Authentication integration points ready

## 📊 Monitoring & Analytics

Integration points ready for:
- User engagement tracking
- Game completion analytics
- Document processing metrics
- System performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

[Add your license here]

## 🆘 Troubleshooting

### Common Issues

**Database connection fails**:
```bash
npm run docker:down
npm run docker:up
```

**Prisma client outdated**:
```bash
npm run db:generate
```

**Build errors**:
```bash
npm run clean
npm run install:all
```

**Port conflicts**:
Check that ports 3000, 4000, 5432, 6379, 9000, 9001 are available.

---

Built with ❤️ for better corporate training experiences.
