# Security Best Practices

## Overview

Security is a critical aspect of the Super Developer Dashboard. This guide outlines the security measures implemented and best practices to follow.

## Authentication & Authorization

### Magic Link Authentication

The project uses passwordless authentication via magic links, which provides several security benefits:

**Benefits**:
- No password storage vulnerabilities
- No password reuse across sites
- Reduced phishing risk
- Automatic session management

**Implementation**:
```typescript
// lib/auth-context.tsx
const signIn = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })
}
```

### Session Management

Sessions are managed via HTTP-only cookies:

- **Secure**: Cookies are HTTP-only (not accessible via JavaScript)
- **SameSite**: Protected against CSRF attacks
- **Automatic Refresh**: Tokens are automatically refreshed by middleware

### Route Protection

All routes (except login and public pages) are protected via middleware:

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user && !isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect('/login')
  }
}
```

### Role-Based Access Control (RBAC)

Implement RBAC using user metadata and database policies:

```typescript
// Check user role
const { data: { user } } = await supabase.auth.getUser()
const userRole = user?.user_metadata?.role

// Conditional rendering
{userRole === 'admin' && <AdminPanel />}
```

## Database Security

### Row Level Security (RLS)

RLS is enabled on all tables to ensure users can only access their own data:

```sql
-- Example: Projects table
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);
```

**Best Practices**:
- Always enable RLS on tables with user data
- Test policies thoroughly
- Use `auth.uid()` for user identification
- Create separate policies for SELECT, INSERT, UPDATE, DELETE

### SQL Injection Prevention

Supabase client library automatically prevents SQL injection:

```typescript
// Safe - parameterized query
const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('id', userInput) // Automatically sanitized
```

**Never**:
- Concatenate user input into SQL strings
- Use raw SQL without parameterization
- Disable RLS in production

## Environment Variables

### Secure Configuration

Environment variables are validated on startup:

```typescript
// lib/env.ts
export function validateEnv() {
  const requiredEnvVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
  // Throws error if missing
}
```

### Best Practices

1. **Never commit secrets**: Use `.env.local` for development
2. **Use different keys per environment**: Dev, staging, prod should have separate keys
3. **Rotate keys regularly**: Change API keys periodically
4. **Limit key permissions**: Use anon key for client, service key only when necessary

### What's Safe to Expose

**Safe** (NEXT_PUBLIC_* prefix):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Never expose**:
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)
- Database passwords
- Third-party API keys
- Encryption keys

## Code Security

### CodeQL Security Scanning

Automated security scanning via GitHub Actions:

```yaml
# .github/workflows/codeql.yml
- name: Initialize CodeQL
  uses: github/codeql-action/init@v3
  with:
    languages: javascript, typescript
    queries: security-extended,security-and-quality
```

**Scans for**:
- SQL injection vulnerabilities
- XSS vulnerabilities
- Authentication bypasses
- Insecure dependencies
- Code quality issues

### Dependency Management

Dependabot automatically checks for vulnerable dependencies:

```yaml
# .github/dependabot.yml
updates:
  - package-ecosystem: "npm"
    schedule:
      interval: "weekly"
```

**Best Practices**:
- Update dependencies regularly
- Review security advisories
- Use `npm audit` before deployments
- Pin critical dependency versions

### Input Validation

Always validate user input:

```typescript
// Example: Form validation with Zod
import { z } from 'zod'

const projectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(['active', 'archived'])
})

const result = projectSchema.safeParse(formData)
if (!result.success) {
  // Handle validation errors
}
```

## API Security

### Rate Limiting

Implement rate limiting to prevent abuse:

```typescript
// Example using Upstash (recommended for Vercel)
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
})

export async function POST(request: Request) {
  const identifier = request.headers.get("x-forwarded-for") || "anonymous"
  const { success } = await ratelimit.limit(identifier)
  
  if (!success) {
    return new Response("Too Many Requests", { status: 429 })
  }
  // Process request
}
```

### CORS Configuration

Configure CORS properly for API routes:

```typescript
export async function GET(request: Request) {
  const origin = request.headers.get('origin')
  const allowedOrigins = ['https://yourdomain.com']
  
  const headers = new Headers()
  if (origin && allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin)
  }
  
  return new Response(JSON.stringify(data), { headers })
}
```

### Request Validation

Validate all API requests:

```typescript
export async function POST(request: Request) {
  // Verify authentication
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }
  
  // Validate request body
  const body = await request.json()
  if (!isValidBody(body)) {
    return new Response("Bad Request", { status: 400 })
  }
  
  // Process request
}
```

## Client-Side Security

### XSS Prevention

React automatically escapes content, but be careful with:

```typescript
// ❌ Dangerous - can execute scripts
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe - automatically escaped
<div>{userInput}</div>

// ✅ Safe - using DOMPurify for HTML content
import DOMPurify from 'isomorphic-dompurify'
<div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />
```

### Content Security Policy (CSP)

Implement CSP headers in `next.config.mjs`:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.supabase.co",
            ].join('; '),
          },
        ],
      },
    ]
  },
}
```

### Local Storage Security

**Never store sensitive data in local storage**:

```typescript
// ❌ Bad - tokens in localStorage
localStorage.setItem('token', accessToken)

// ✅ Good - use HTTP-only cookies (handled by Supabase)
// Sessions are automatically stored securely
```

## Deployment Security

### Vercel Deployment

Security considerations for Vercel:

1. **Environment Variables**: Set in Vercel dashboard, never in code
2. **Serverless Functions**: Automatically isolated
3. **Edge Middleware**: Runs on Vercel Edge Network for fast auth checks
4. **Automatic HTTPS**: All Vercel deployments use HTTPS

### Environment-Specific Configurations

```typescript
// Different configs per environment
const config = {
  development: {
    apiUrl: 'http://localhost:3000',
    logLevel: 'debug',
  },
  production: {
    apiUrl: 'https://yourdomain.com',
    logLevel: 'error',
  },
}

export default config[process.env.NODE_ENV]
```

## Monitoring & Logging

### Security Event Logging

Log security-relevant events:

```typescript
async function logSecurityEvent(event: string, details: any) {
  await supabase.from('security_logs').insert({
    event,
    details,
    timestamp: new Date().toISOString(),
    user_id: auth.uid(),
  })
}

// Usage
await logSecurityEvent('login_attempt', { 
  email, 
  success: true 
})
```

### Error Handling

Never expose sensitive information in errors:

```typescript
try {
  // Database operation
} catch (error) {
  // ❌ Bad - exposes details
  return Response.json({ error: error.message })
  
  // ✅ Good - generic message
  console.error('Database error:', error)
  return Response.json({ 
    error: 'An error occurred processing your request' 
  })
}
```

## Security Checklist

### Pre-Deployment

- [ ] All environment variables set correctly
- [ ] RLS enabled on all user data tables
- [ ] CodeQL scan passed
- [ ] No security vulnerabilities in dependencies
- [ ] Authentication working correctly
- [ ] CORS configured properly
- [ ] Rate limiting implemented
- [ ] Error messages don't expose sensitive data

### Regular Maintenance

- [ ] Review and rotate API keys quarterly
- [ ] Update dependencies monthly
- [ ] Review security logs weekly
- [ ] Test authentication flows monthly
- [ ] Review RLS policies quarterly
- [ ] Audit user permissions quarterly

## Incident Response

### If a Security Issue is Discovered

1. **Assess Impact**: Determine what data/users are affected
2. **Contain**: Temporarily disable affected features if necessary
3. **Fix**: Implement a fix and test thoroughly
4. **Deploy**: Deploy fix to production immediately
5. **Notify**: Inform affected users if personal data was compromised
6. **Document**: Update security documentation and policies
7. **Review**: Conduct post-incident review

### Reporting Security Issues

**DO NOT** open public issues for security vulnerabilities.

Instead:
- Email security contacts (update in SECURITY.md)
- Provide detailed description
- Include steps to reproduce
- Suggest fix if possible

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [GitHub Security Advisories](https://github.com/advisories)
