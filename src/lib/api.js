import { supabase } from './supabase'

export async function fetchVtubers() {
  const { data, error } = await supabase
    .from('vtubers')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function fetchVtuberById(id) {
  const { data, error } = await supabase
    .from('vtubers')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function registerVtuber(vtuber) {
  const { data, error } = await supabase
    .from('vtubers')
    .insert(vtuber)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function recordImpression(vtuberId, type) {
  const { error } = await supabase
    .from('impressions')
    .insert({ vtuber_id: vtuberId, type })
  if (error) throw error
}

export async function fetchImpressionCounts(vtuberId) {
  const { count: viewCount, error: viewError } = await supabase
    .from('impressions')
    .select('*', { count: 'exact', head: true })
    .eq('vtuber_id', vtuberId)
    .eq('type', 'view')
  if (viewError) throw viewError

  const { count: matchCount, error: matchError } = await supabase
    .from('impressions')
    .select('*', { count: 'exact', head: true })
    .eq('vtuber_id', vtuberId)
    .eq('type', 'match')
  if (matchError) throw matchError

  return { viewCount: viewCount ?? 0, matchCount: matchCount ?? 0 }
}
