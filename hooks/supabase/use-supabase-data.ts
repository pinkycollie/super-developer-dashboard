'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

/**
 * Hook for fetching data from Supabase with real-time subscriptions
 * @param table - The table to fetch from
 * @param options - Query options
 */
export function useSupabaseQuery<T = any>(
  table: string,
  options?: {
    select?: string
    filter?: Record<string, any>
    orderBy?: { column: string; ascending?: boolean }
    limit?: number
    realtime?: boolean
  }
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  useEffect(() => {
    let channel: RealtimeChannel | null = null

    async function fetchData() {
      try {
        setLoading(true)
        let query = supabase.from(table).select(options?.select || '*')

        if (options?.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        if (options?.orderBy) {
          query = query.order(options.orderBy.column, {
            ascending: options.orderBy.ascending ?? false,
          })
        }

        if (options?.limit) {
          query = query.limit(options.limit)
        }

        const { data, error } = await query

        if (error) throw error
        setData(data || [])
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Set up real-time subscription if enabled
    if (options?.realtime) {
      channel = supabase
        .channel(`${table}_changes`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          () => {
            fetchData()
          }
        )
        .subscribe()
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
      }
    }
  }, [table, JSON.stringify(options)])

  return { data, loading, error, refetch: () => setLoading(true) }
}

/**
 * Hook for inserting data into Supabase
 */
export function useSupabaseInsert<T = any>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const insert = async (data: Partial<T> | Partial<T>[]) => {
    try {
      setLoading(true)
      setError(null)

      const { data: result, error } = await supabase
        .from(table)
        .insert(data as any)
        .select()

      if (error) throw error
      return result
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { insert, loading, error }
}

/**
 * Hook for updating data in Supabase
 */
export function useSupabaseUpdate<T = any>(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const update = async (
    id: string | number,
    data: Partial<T>,
    idColumn: string = 'id'
  ) => {
    try {
      setLoading(true)
      setError(null)

      const { data: result, error } = await supabase
        .from(table)
        .update(data as any)
        .eq(idColumn, id)
        .select()

      if (error) throw error
      return result
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { update, loading, error }
}

/**
 * Hook for deleting data from Supabase
 */
export function useSupabaseDelete(table: string) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const supabase = createClient()

  const deleteRecord = async (
    id: string | number,
    idColumn: string = 'id'
  ) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.from(table).delete().eq(idColumn, id)

      if (error) throw error
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { deleteRecord, loading, error }
}
