'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Sparkles } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email)
      toast({
        title: 'Check your email',
        description: 'We sent you a magic link to sign in.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send magic link. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black to-gray-900">
      <Card className="w-full max-w-md bg-gray-950 border-gray-800">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-blue-500" />
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
              SUPER DEVELOPER
            </CardTitle>
          </div>
          <CardDescription>
            Sign in to your account with a magic link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 bg-black border-gray-800"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-400">
            <p>No password required. We'll send you a secure link.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
