# Supabase Integration Guide

## Overview

This project uses Supabase as the backend platform, providing:
- **Authentication**: Magic link email authentication with RBAC
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time**: Live data synchronization
- **Storage**: File storage capabilities (extensible)

## Architecture

### Authentication Flow

```
User enters email → Supabase sends magic link → User clicks link → 
Auth callback processes token → User redirected to dashboard
```

### File Structure

```
lib/supabase/
├── client.ts       # Browser-side Supabase client
├── server.ts       # Server-side Supabase client
└── middleware.ts   # Session management and route protection
```

## Client Configuration

### Browser Client (`client.ts`)

Used for client-side operations in React components:

```typescript
import { createClient } from '@/lib/supabase/client'

const supabase = createClient()
```

**Use cases**:
- Authentication actions (sign in, sign out)
- Real-time subscriptions
- Client-side data fetching in components

### Server Client (`server.ts`)

Used for server-side operations in API routes and Server Components:

```typescript
import { createClient } from '@/lib/supabase/server'

const supabase = await createClient()
```

**Use cases**:
- Server Components data fetching
- API route handlers
- Server-side authentication checks

## Authentication

### Magic Link Authentication

The project uses passwordless authentication via magic links:

```typescript
// In login page
const { signIn } = useAuth()
await signIn(email)
```

**Benefits**:
- No password management
- More secure (no password reuse)
- Better user experience
- Reduces support burden

### Protected Routes

Routes are protected via middleware (`middleware.ts`):

```typescript
// Automatically redirects unauthenticated users to /login
// Excludes: /login, /auth/*, and /
```

### Role-Based Access Control (RBAC)

Implement RBAC using Supabase user metadata:

```typescript
// Add custom claims during user creation
const { data, error } = await supabase.auth.updateUser({
  data: { role: 'admin' }
})

// Check user role
const { data: { user } } = await supabase.auth.getUser()
const userRole = user?.user_metadata?.role
```

## Database Operations

### Using Custom Hooks

The project provides custom hooks for database operations:

#### Query Data

```typescript
import { useSupabaseQuery } from '@/hooks/supabase/use-supabase-data'

function MyComponent() {
  const { data, loading, error } = useSupabaseQuery('projects', {
    filter: { user_id: userId },
    orderBy: { column: 'created_at', ascending: false },
    limit: 10,
    realtime: true // Enable real-time updates
  })
}
```

#### Insert Data

```typescript
import { useSupabaseInsert } from '@/hooks/supabase/use-supabase-data'

function CreateProject() {
  const { insert, loading } = useSupabaseInsert('projects')
  
  const handleSubmit = async (formData) => {
    await insert({
      name: formData.name,
      description: formData.description,
      user_id: userId
    })
  }
}
```

#### Update Data

```typescript
import { useSupabaseUpdate } from '@/hooks/supabase/use-supabase-data'

function EditProject() {
  const { update, loading } = useSupabaseUpdate('projects')
  
  const handleUpdate = async (id, changes) => {
    await update(id, changes)
  }
}
```

#### Delete Data

```typescript
import { useSupabaseDelete } from '@/hooks/supabase/use-supabase-data'

function DeleteProject() {
  const { deleteRecord, loading } = useSupabaseDelete('projects')
  
  const handleDelete = async (id) => {
    await deleteRecord(id)
  }
}
```

### Direct Database Access

For more complex queries, use the Supabase client directly:

```typescript
const supabase = createClient()

// Complex query example
const { data, error } = await supabase
  .from('projects')
  .select(`
    *,
    deployments (
      id,
      status,
      created_at
    )
  `)
  .eq('status', 'active')
  .gte('created_at', startDate)
  .order('created_at', { ascending: false })
```

## Real-time Features

### Subscribe to Changes

```typescript
const supabase = createClient()

const channel = supabase
  .channel('projects_changes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'projects' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// Cleanup
return () => {
  supabase.removeChannel(channel)
}
```

### Real-time in Hooks

The `useSupabaseQuery` hook supports real-time out of the box:

```typescript
const { data } = useSupabaseQuery('projects', {
  realtime: true // Automatically updates when data changes
})
```

## Analytics Integration

### Using the Analytics Hook

```typescript
import { useAnalytics } from '@/hooks/supabase/use-analytics'

function Dashboard() {
  const { data, loading, error } = useAnalytics()
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      <p>Total Projects: {data.totalProjects}</p>
      <p>Success Rate: {data.successRate}%</p>
      <p>Avg Build Time: {data.avgBuildTime}s</p>
    </div>
  )
}
```

## Row Level Security (RLS)

RLS ensures users can only access their own data:

### Example Policies

```sql
-- Allow users to read only their own projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert projects for themselves
CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Testing RLS Policies

```typescript
// This will only return projects where user_id matches the authenticated user
const { data } = await supabase
  .from('projects')
  .select('*')
// RLS automatically filters results
```

## Best Practices

### 1. Always Use RLS

Never disable RLS on tables with user data. It's your first line of defense.

### 2. Client vs Server

- Use **client** for: UI interactions, real-time, client-side queries
- Use **server** for: API routes, server components, sensitive operations

### 3. Error Handling

Always handle errors from Supabase operations:

```typescript
const { data, error } = await supabase.from('projects').select('*')
if (error) {
  console.error('Error fetching projects:', error)
  // Handle error appropriately
}
```

### 4. Type Safety

Define TypeScript types for your database tables:

```typescript
interface Project {
  id: string
  user_id: string
  name: string
  description: string
  status: 'active' | 'archived'
  created_at: string
  updated_at: string
}

const { data } = await supabase
  .from('projects')
  .select('*')
  .returns<Project[]>()
```

### 5. Connection Pooling

Supabase automatically handles connection pooling. Don't create multiple client instances unnecessarily.

## Troubleshooting

### Issue: "Invalid API key"

**Solution**: Verify your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct and the key hasn't been rotated.

### Issue: RLS preventing access

**Solution**: 
1. Check your RLS policies in Supabase dashboard
2. Verify `auth.uid()` matches the `user_id` column
3. Test with RLS disabled temporarily (not in production!)

### Issue: Real-time not working

**Solution**:
1. Check that Realtime is enabled for your table in Supabase
2. Verify you're subscribed to the correct channel
3. Check browser console for errors

## Advanced Topics

### Custom Roles and Permissions

Store user roles in the `user_profiles` table:

```sql
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT DEFAULT 'user',
  permissions JSONB
);
```

Use in RLS policies:

```sql
CREATE POLICY "Admins can view all projects"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );
```

### Serverless Functions

Supabase supports Edge Functions for custom backend logic:

```typescript
// supabase/functions/hello/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  return new Response(
    JSON.stringify({ message: "Hello from Supabase!" }),
    { headers: { "Content-Type": "application/json" } },
  )
})
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime Documentation](https://supabase.com/docs/guides/realtime)
