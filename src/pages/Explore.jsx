import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchVtubers, recordImpression } from '../lib/api'
import { rankByMatch } from '../lib/matching'
import { MOODS, GENDERS, TAG_GROUPS, PLATFORM_TAGS } from '../lib/constants'
import VTuberCard from '../components/VTuberCard'

export default function Explore() {
  const location = useLocation()
  const answers = location.state?.answers
  const preferredGender = location.state?.gender

  const [vtubers, setVtubers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedGender, setSelectedGender] = useState('')

  useEffect(() => {
    fetchVtubers()
      .then(setVtubers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const matchResults = useMemo(() => {
    if (!answers) return null
    const pool = preferredGender
      ? vtubers.filter((v) => v.gender === preferredGender)
      : vtubers
    return rankByMatch(pool, answers).slice(0, 5)
  }, [answers, vtubers, preferredGender])

  useEffect(() => {
    if (!matchResults) return
    matchResults.forEach(({ vtuber }) => {
      recordImpression(vtuber.id, 'match').catch(() => {})
    })
  }, [matchResults])

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    )
  }

  const filtered = useMemo(() => {
    const selectedPlatformTags = selectedTags.filter((tag) =>
      PLATFORM_TAGS.includes(tag),
    )
    const selectedOtherTags = selectedTags.filter(
      (tag) => !PLATFORM_TAGS.includes(tag),
    )
    return vtubers.filter((v) => {
      if (selectedMood && v.mood !== selectedMood) return false
      if (selectedGender && v.gender !== selectedGender) return false
      if (
        selectedPlatformTags.length > 0 &&
        !selectedPlatformTags.some((tag) => v.tags?.includes(tag))
      )
        return false
      if (
        selectedOtherTags.length > 0 &&
        !selectedOtherTags.every((tag) => v.tags?.includes(tag))
      )
        return false
      return true
    })
  }, [vtubers, selectedTags, selectedMood, selectedGender])

  if (loading) return <p className="text-center text-gray-400">読み込み中...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="flex flex-col gap-10">
      {matchResults && (
        <section>
          <h1 className="text-2xl font-bold mb-4">診断結果</h1>
          {matchResults.length === 0 ? (
            <p className="text-gray-400">該当するVTuberがいません。</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchResults.map(({ vtuber, score }) => (
                <VTuberCard key={vtuber.id} vtuber={vtuber} matchScore={score} />
              ))}
            </div>
          )}
        </section>
      )}

      <section>
        <h1 className="text-2xl font-bold mb-4">VTuberを探す</h1>

        <div className="flex flex-col gap-3 mb-6">
          <div>
            <p className="text-sm font-semibold mb-2">性別</p>
            <div className="flex flex-wrap gap-2">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  onClick={() =>
                    setSelectedGender((prev) => (prev === g ? '' : g))
                  }
                  className={`text-sm px-3 py-1 rounded-full border transition ${
                    selectedGender === g
                      ? 'bg-gradient-to-r from-[#ff005d] to-[#ff00d4] text-white border-transparent'
                      : 'border-gray-300 text-gray-600 hover:border-pink-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">ムード</p>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((mood) => (
                <button
                  key={mood}
                  onClick={() =>
                    setSelectedMood((prev) => (prev === mood ? '' : mood))
                  }
                  className={`text-sm px-3 py-1 rounded-full border transition ${
                    selectedMood === mood
                      ? 'bg-gradient-to-r from-[#ff005d] to-[#ff00d4] text-white border-transparent'
                      : 'border-gray-300 text-gray-600 hover:border-pink-400'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          {TAG_GROUPS.filter((group) => group.label !== 'ムード').map((group) => (
            <div key={group.label}>
              <p className="text-sm font-semibold mb-2">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`text-sm px-3 py-1 rounded-full border transition ${
                      selectedTags.includes(tag)
                        ? 'bg-gradient-to-r from-[#ff005d] to-[#ff00d4] text-white border-transparent'
                        : 'border-gray-300 text-gray-600 hover:border-pink-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-gray-400">該当するVTuberがいません。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((vtuber) => (
              <VTuberCard key={vtuber.id} vtuber={vtuber} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
