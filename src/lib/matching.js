export function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, v, i) => sum + v * b[i], 0)
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0))
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0))
  if (magA === 0 || magB === 0) return 0
  return dot / (magA * magB)
}

export function rankByMatch(vtubers, answerVector) {
  return vtubers
    .map((vtuber) => ({
      vtuber,
      score: cosineSimilarity(answerVector, vtuber.vector),
    }))
    .sort((a, b) => b.score - a.score)
}
