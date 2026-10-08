# System Architecture

## Overview

The Super Developer Dashboard is built as a modern, full-stack web application using Next.js 14 with the App Router, Supabase for backend services, and a comprehensive set of UI components.

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI Components**: Radix UI + Custom Components
- **Styling**: Tailwind CSS
- **State Management**: React Context + Hooks
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (Magic Link)
- **Real-time**: Supabase Realtime
- **API**: Next.js API Routes (App Router)

### DevOps
- **Hosting**: Vercel (recommended)
- **CI/CD**: GitHub Actions
- **Security Scanning**: CodeQL
- **Dependency Management**: Dependabot

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (Browser)                     │
│                                                              │
│  ┌────────────┐  ┌─────────────┐  ┌────────────────────┐  │
│  │   React    │  │   Tailwind  │  │   Lucide Icons     │  │
│  │ Components │  │     CSS     │  │   Radix UI         │  │
│  └────────────┘  └─────────────┘  └────────────────────┘  │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Auth Context & Hooks                   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ HTTPS
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server (Vercel)                   │
│                                                              │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │  App Router    │  │  Middleware  │  │   API Routes   │ │
│  │  (Pages)       │  │  (Auth)      │  │                │ │
│  └────────────────┘  └──────────────┘  └────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │          Server-Side Supabase Client                │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ API Calls
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                      Supabase Platform                       │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Auth       │  │  PostgreSQL  │  │    Realtime      │  │
│  │  (Magic     │  │  (with RLS)  │  │  (WebSockets)    │  │
│  │   Link)     │  │              │  │                  │  │
│  └─────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐                         │
│  │  Storage    │  │  Edge        │                         │
│  │  (Files)    │  │  Functions   │                         │
│  └─────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
super-developer-dashboard/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   │   ├── login/                # Login page
│   │   └── auth/                 # Auth handlers
│   │       └── callback/         # OAuth callback
│   ├── dashboard/                # Dashboard pages
│   │   ├── cli/                  # CLI interface
│   │   ├── create/               # Project creation
│   │   └── ide/                  # IDE interface
│   ├── layout.tsx                # Root layout (providers)
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── app-sidebar.tsx           # Main sidebar
│   ├── prompt-library.tsx        # Prompt management
│   ├── budget-analyzer.tsx       # Budget tracking
│   └── ...                       # Feature components
│
├── hooks/                        # Custom React hooks
│   ├── supabase/                 # Supabase hooks
│   │   ├── use-supabase-data.ts  # CRUD operations
│   │   └── use-analytics.ts      # Analytics data
│   └── use-toast.ts              # Toast notifications
│
├── lib/                          # Utilities and config
│   ├── supabase/                 # Supabase setup
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── auth-context.tsx          # Auth React context
│   ├── utils.ts                  # Helper functions
│   └── env.ts                    # Environment validation
│
├── src/                          # Probot bot code
│   └── index.ts                  # GitHub bot logic
│
├── test/                         # Tests
│   └── index.test.ts             # Probot tests
│
├── docs/                         # Documentation
│   ├── supabase.md               # Supabase guide
│   ├── security.md               # Security practices
│   ├── prompts.md                # Prompt engineering
│   └── architecture.md           # This file
│
├── .github/                      # GitHub config
│   ├── workflows/                # CI/CD workflows
│   │   ├── main.yml              # Deployment
│   │   └── codeql.yml            # Security scanning
│   └── dependabot.yml            # Dependency updates
│
├── middleware.ts                 # Next.js middleware
├── next.config.mjs               # Next.js config
├── tailwind.config.ts            # Tailwind config
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
├── .env.example                  # Environment template
├── SETUP.md                      # Setup guide
└── SECURITY.md                   # Security policy
```

## Data Flow

### Authentication Flow

```
1. User visits protected route
   ↓
2. Middleware checks auth status
   ↓
3. If not authenticated → redirect to /login
   ↓
4. User enters email
   ↓
5. Supabase sends magic link
   ↓
6. User clicks link
   ↓
7. Auth callback processes token
   ↓
8. Session stored in HTTP-only cookie
   ↓
9. User redirected to dashboard
```

### Data Fetching Flow (Server Component)

```
1. Server Component renders
   ↓
2. Creates server Supabase client
   ↓
3. Fetches data from Supabase
   ↓
4. RLS policies applied automatically
   ↓
5. Data returned to component
   ↓
6. HTML sent to client
```

### Data Fetching Flow (Client Component)

```
1. Component mounts
   ↓
2. useSupabaseQuery hook called
   ↓
3. Creates browser Supabase client
   ↓
4. Fetches data from Supabase
   ↓
5. RLS policies applied
   ↓
6. State updated with data
   ↓
7. Component re-renders
   ↓
8. (Optional) Real-time subscription active
```

### Real-time Updates Flow

```
1. Component subscribes to channel
   ↓
2. Database change occurs
   ↓
3. Supabase broadcasts change
   ↓
4. Client receives update
   ↓
5. Hook refetches data
   ↓
6. Component re-renders with new data
```

## Key Design Patterns

### 1. Server vs Client Components

**Server Components** (default in App Router):
- Data fetching
- Accessing backend resources
- Security-sensitive operations
- SEO-critical content

**Client Components** (`'use client'` directive):
- Interactive UI
- Event handlers
- Browser APIs
- Real-time subscriptions
- Context providers

### 2. Authentication Pattern

```typescript
// middleware.ts - Route protection
export async function middleware(request: NextRequest) {
  const user = await getUser()
  if (!user) return redirect('/login')
  return NextResponse.next()
}

// Component - Auth context
const { user, signIn, signOut } = useAuth()

// Server Component - Direct check
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()
```

### 3. Data Management Pattern

```typescript
// Custom hook for abstraction
const { data, loading, error } = useSupabaseQuery('table', options)

// Direct query for complex operations
const { data } = await supabase
  .from('table')
  .select('*, related(*)')
  .eq('field', value)
```

### 4. Error Handling Pattern

```typescript
try {
  const result = await operation()
  return success(result)
} catch (error) {
  console.error('Operation failed:', error)
  return failure('User-friendly message')
}
```

## Security Architecture

### Defense in Depth

1. **Network Level**: HTTPS, CORS, CSP headers
2. **Authentication**: Magic link, HTTP-only cookies
3. **Authorization**: Row Level Security (RLS)
4. **Application**: Input validation, output encoding
5. **Code**: CodeQL scanning, dependency updates

### Authentication Layers

```
Request → Middleware → Server Component → API Route → Database
   ↓          ↓             ↓              ↓           ↓
Session    Verify       Check User      Validate    RLS
Cookie     Token        Context         Input       Policy
```

## Scalability Considerations

### Current Architecture

- **Vercel Edge Functions**: Global distribution, fast cold starts
- **Supabase**: Auto-scaling database, built-in connection pooling
- **Static Generation**: Pre-rendered pages where possible
- **ISR**: Incremental Static Regeneration for dynamic content

### Future Enhancements

- **Caching**: Redis/Upstash for session and data caching
- **CDN**: Asset optimization and distribution
- **Database**: Read replicas for heavy read operations
- **Queue**: Background job processing (Vercel Cron, Supabase Functions)

## Performance Optimization

### Current Optimizations

1. **Code Splitting**: Automatic via Next.js
2. **Image Optimization**: Next.js Image component
3. **Font Optimization**: Next.js Font optimization
4. **Tree Shaking**: Dead code elimination
5. **Minification**: Production builds minified

### Monitoring

- **Vercel Analytics**: Page performance, Core Web Vitals
- **Supabase Dashboard**: Database performance, query metrics
- **Browser DevTools**: Client-side performance profiling

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Set up environment
cp .env.example .env.local

# Run development server
npm run dev
```

### Testing Strategy

- **Unit Tests**: Jest for utilities and hooks
- **Integration Tests**: Testing Library for components
- **E2E Tests**: Playwright for user flows
- **Security Tests**: CodeQL for vulnerabilities

### CI/CD Pipeline

```
Push to GitHub
    ↓
GitHub Actions
    ↓
├─ Run Tests
├─ Lint Code
├─ Security Scan
└─ Type Check
    ↓
Deploy to Vercel
    ↓
Environment Variables Applied
    ↓
Production Live
```

## Integration Points

### Supabase Integration

- **Auth**: User authentication and session management
- **Database**: PostgreSQL with real-time capabilities
- **Storage**: File uploads (extensible)
- **Edge Functions**: Serverless functions (extensible)

### Vercel Integration

- **Hosting**: Edge network deployment
- **Functions**: API routes as serverless functions
- **Analytics**: Built-in performance monitoring
- **Preview Deployments**: PR preview environments

### GitHub Integration

- **Probot Bot**: Automated issue/PR management
- **Actions**: CI/CD workflows
- **Security**: Dependabot, CodeQL scanning

## API Design

### RESTful Routes

```
GET    /api/projects         # List projects
POST   /api/projects         # Create project
GET    /api/projects/[id]    # Get project
PUT    /api/projects/[id]    # Update project
DELETE /api/projects/[id]    # Delete project
```

### Response Format

```typescript
// Success
{
  data: { /* result */ },
  message: "Success message"
}

// Error
{
  error: "Error message",
  code: "ERROR_CODE"
}
```

## Database Schema

### Core Tables

```sql
-- Authentication (managed by Supabase)
auth.users

-- User Profiles
user_profiles (
  id: UUID,
  user_id: UUID FK → auth.users,
  display_name: TEXT,
  plan: TEXT,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)

-- Projects
projects (
  id: UUID,
  user_id: UUID FK → auth.users,
  name: TEXT,
  description: TEXT,
  status: TEXT,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
)

-- Deployments
deployments (
  id: UUID,
  project_id: UUID FK → projects,
  status: TEXT,
  build_time: INTEGER,
  created_at: TIMESTAMP
)
```

## Monitoring and Observability

### Key Metrics

- **Performance**: Page load time, API response time
- **Errors**: Error rate, error types
- **Usage**: Active users, page views
- **Database**: Query performance, connection pool

### Logging Strategy

- **Client**: Console errors (production: sent to logging service)
- **Server**: Vercel logs, Supabase logs
- **Security**: Auth events, failed requests

## Future Architecture Enhancements

### Planned Features

1. **WebSocket Server**: Real-time collaboration
2. **Microservices**: Specialized services (code execution, AI)
3. **Message Queue**: Async job processing
4. **GraphQL API**: Alternative to REST
5. **Mobile App**: React Native companion

### Scalability Roadmap

1. **Phase 1** (Current): Monolithic Next.js app
2. **Phase 2**: Separate frontend and backend
3. **Phase 3**: Microservices architecture
4. **Phase 4**: Multi-region deployment

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [React Documentation](https://react.dev)
