'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface AnalyticsData {
  totalProjects: number
  activeProjects: number
  totalDeployments: number
  successRate: number
  avgBuildTime: number
  recentActivity: Array<{
    id: string
    type: string
    message: string
    timestamp: string
  }>
}

/**
 * Hook for fetching dashboard analytics from Supabase
 */
export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true)

        // Fetch projects data
        const { data: projects, error: projectsError } = await supabase
          .from('projects')
          .select('id, status, created_at')

        if (projectsError) throw projectsError

        // Fetch deployments data
        const { data: deployments, error: deploymentsError } = await supabase
          .from('deployments')
          .select('id, status, build_time, created_at')
          .order('created_at', { ascending: false })
          .limit(10)

        if (deploymentsError) throw deploymentsError

        // Calculate analytics
        const totalProjects = projects?.length || 0
        const activeProjects =
          projects?.filter((p) => p.status === 'active').length || 0
        const totalDeployments = deployments?.length || 0
        const successfulDeployments =
          deployments?.filter((d) => d.status === 'success').length || 0
        const successRate =
          totalDeployments > 0
            ? (successfulDeployments / totalDeployments) * 100
            : 0
        const avgBuildTime =
          deployments && deployments.length > 0
            ? deployments.reduce((acc, d) => acc + (d.build_time || 0), 0) /
              deployments.length
            : 0

        // Map recent activity
        const recentActivity =
          deployments?.map((d) => ({
            id: d.id,
            type: 'deployment',
            message: `Deployment ${d.status}`,
            timestamp: d.created_at,
          })) || []

        setData({
          totalProjects,
          activeProjects,
          totalDeployments,
          successRate,
          avgBuildTime,
          recentActivity,
        })
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  return { data, loading, error }
}

/**
 * Hook for fetching user-specific data from Supabase
 */
export function useUserData(userId?: string) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    async function fetchUserData() {
      try {
        setLoading(true)

        const { data: userData, error: userError } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single()

        if (userError && userError.code !== 'PGRST116') {
          // PGRST116 is "not found", which is OK
          throw userError
        }

        setData(userData)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  return { data, loading, error }
}
