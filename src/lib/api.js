import { supabase } from './supabase'

export async function uploadAvatar(file) {
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`
  const { error } = await supabase.storage.from('avatars').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  return data.publicUrl
}

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

export async function updateVtuber(id, vtuber) {
  const { data, error } = await supabase
    .from('vtubers')
    .update(vtuber)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteVtuber(id) {
  const { error } = await supabase.from('vtubers').delete().eq('id', id)
  if (error) throw error
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
