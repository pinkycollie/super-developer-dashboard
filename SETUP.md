# Setup Guide - Super Developer Dashboard

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- A Supabase account (free tier is sufficient)
- Git installed

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pinkycollie/super-developer-dashboard.git
cd super-developer-dashboard
```

### 2. Install Dependencies

Using npm:
```bash
npm install --legacy-peer-deps
```

Using pnpm:
```bash
pnpm install
```

### 3. Supabase Setup

#### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the project details:
   - **Name**: super-developer-dashboard
   - **Database Password**: Choose a strong password
   - **Region**: Select your preferred region

#### Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL**: `https://your-project.supabase.co`
   - **Anon Public Key**: Your public API key

#### Configure Authentication

1. Go to **Authentication** → **Providers** in your Supabase dashboard
2. Enable **Email** provider
3. Configure Email Templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize the magic link email template

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 5. Database Schema (Optional)

If you want to use the full analytics features, create these tables in Supabase:

```sql
-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Deployments table
CREATE TABLE deployments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  build_time INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- User profiles table
CREATE TABLE user_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  display_name TEXT,
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. First Login

1. Navigate to [http://localhost:3000/login](http://localhost:3000/login)
2. Enter your email address
3. Check your email for the magic link
4. Click the link to authenticate
5. You'll be redirected to the dashboard

## Development Workflow

### Project Structure

```
super-developer-dashboard/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Login page
│   └── layout.tsx         # Root layout with providers
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── hooks/                 # Custom React hooks
│   └── supabase/         # Supabase-specific hooks
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client configuration
│   ├── auth-context.tsx  # Authentication context
│   └── env.ts            # Environment validation
├── docs/                  # Documentation
├── .env.example          # Environment variable template
└── middleware.ts         # Authentication middleware
```

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Environment Variables for Production

In your Vercel project settings, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Troubleshooting

### Issue: "Missing required environment variables"

**Solution**: Make sure your `.env.local` file exists and contains the required variables.

### Issue: Authentication not working

**Solution**: 
1. Verify your Supabase URL and keys are correct
2. Check that email provider is enabled in Supabase
3. Verify the redirect URL is configured correctly

### Issue: Build fails with TypeScript errors

**Solution**: 
```bash
npm run build -- --no-lint
```

This project has `ignoreBuildErrors: true` configured for rapid development.

## Next Steps

- Read the [Supabase Integration Guide](./supabase.md)
- Review [Security Best Practices](./security.md)
- Explore [Prompt Engineering Guidelines](./prompts.md)
- Understand the [System Architecture](./architecture.md)

## Support

For issues or questions:
- Open an issue on GitHub
- Check the documentation in the `/docs` folder
- Review Supabase documentation at [https://supabase.com/docs](https://supabase.com/docs)
