const MY_VTUBERS_KEY = 'vmap_my_vtubers'

export function getMyVtuberIds() {
  try {
    const raw = localStorage.getItem(MY_VTUBERS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addMyVtuberId(id) {
  const ids = getMyVtuberIds()
  if (!ids.includes(id)) {
    localStorage.setItem(MY_VTUBERS_KEY, JSON.stringify([...ids, id]))
  }
}

export function removeMyVtuberId(id) {
  const ids = getMyVtuberIds()
  localStorage.setItem(
    MY_VTUBERS_KEY,
    JSON.stringify(ids.filter((existing) => existing !== id)),
  )
}
