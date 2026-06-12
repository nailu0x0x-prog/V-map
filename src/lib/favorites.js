const FAVORITES_KEY = 'vmap_favorites'

export function getFavoriteIds() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function isFavorite(vtuberId) {
  return getFavoriteIds().includes(vtuberId)
}

export function toggleFavorite(vtuberId) {
  const ids = getFavoriteIds()
  const next = ids.includes(vtuberId)
    ? ids.filter((id) => id !== vtuberId)
    : [...ids, vtuberId]
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
  return next
}
