import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchVtuberById, recordImpression } from '../lib/api'
import { isFavorite, toggleFavorite } from '../lib/favorites'

const LINK_LABELS = {
  youtube: 'YouTube',
  twitch: 'Twitch',
  twitcasting: 'ツイキャス',
  x: 'X',
  iriam: 'IRIAM',
  tiktok: 'TikTok',
  other: 'その他',
}

export default function VTuberDetail() {
  const { id } = useParams()
  const [vtuber, setVtuber] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favorite, setFavorite] = useState(() => isFavorite(id))

  useEffect(() => {
    fetchVtuberById(id)
      .then((data) => {
        setVtuber(data)
        recordImpression(id, 'view').catch(() => {})
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleToggleFavorite = () => {
    toggleFavorite(id)
    setFavorite(isFavorite(id))
  }

  if (loading) return <p className="text-center text-gray-400">読み込み中...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>
  if (!vtuber) return null

  const links = vtuber.links || {}

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <Link to="/explore" className="text-sm text-pink-600">
        ← 一覧に戻る
      </Link>

      <div className="flex items-center gap-4">
        <img
          src={vtuber.avatar_url || 'https://placehold.co/96x96?text=V'}
          alt={vtuber.name}
          className="w-24 h-24 rounded-full object-cover bg-gray-100"
        />
        <div>
          <h1 className="text-2xl font-bold">{vtuber.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            {vtuber.mood && (
              <p className="text-pink-600 text-sm">{vtuber.mood}</p>
            )}
            {vtuber.gender && (
              <p className="text-gray-400 text-sm">{vtuber.gender}</p>
            )}
          </div>
        </div>
        <button
          onClick={handleToggleFavorite}
          className={`ml-auto px-4 py-2 rounded-full border text-sm font-semibold transition ${
            favorite
              ? 'bg-gradient-to-r from-[#ff005d] to-[#ff00d4] text-white border-transparent'
              : 'border-gray-300 text-gray-600 hover:border-pink-400'
          }`}
        >
          {favorite ? '♥ 気に入り済み' : '♡ 気になる'}
        </button>
      </div>

      {vtuber.bio && <p className="text-gray-600 whitespace-pre-wrap">{vtuber.bio}</p>}

      {vtuber.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {vtuber.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {Object.entries(links).filter(([, url]) => url).length > 0 && (
        <div className="flex flex-wrap gap-3">
          {Object.entries(links)
            .filter(([, url]) => url)
            .map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:border-pink-400 transition"
              >
                {LINK_LABELS[key] || key}
              </a>
            ))}
        </div>
      )}
    </div>
  )
}
