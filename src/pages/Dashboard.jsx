import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchVtuberById, fetchImpressionCounts, deleteVtuber } from '../lib/api'
import { getMyVtuberIds, removeMyVtuberId } from '../lib/myVtubers'
import { getFavoriteIds, toggleFavorite } from '../lib/favorites'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(
    getMyVtuberIds().length > 0 || getFavoriteIds().length > 0,
  )
  const [error, setError] = useState(null)

  useEffect(() => {
    const myIds = getMyVtuberIds()
    const favoriteIds = getFavoriteIds()
    if (myIds.length === 0 && favoriteIds.length === 0) {
      return
    }

    Promise.allSettled([
      Promise.allSettled(
        myIds.map(async (id) => {
          const vtuber = await fetchVtuberById(id)
          const counts = await fetchImpressionCounts(id)
          return { vtuber, ...counts }
        }),
      ),
      Promise.allSettled(favoriteIds.map((id) => fetchVtuberById(id))),
    ])
      .then(([myResults, favoriteResults]) => {
        const fulfilledMy = myResults
          .filter((r) => r.status === 'fulfilled')
          .map((r) => r.value)
        const fulfilledFavorites = favoriteResults
          .filter((r) => r.status === 'fulfilled')
          .map((r) => r.value)
        setItems(fulfilledMy)
        setFavorites(fulfilledFavorites)
        if (
          fulfilledMy.length === 0 &&
          fulfilledFavorites.length === 0 &&
          (myIds.length > 0 || favoriteIds.length > 0)
        ) {
          setError(
            'データの読み込みに失敗しました。ブラウザの設定（広告・トラッカーブロック機能など）で通信がブロックされている可能性があります。設定を緩めて再度お試しください。',
          )
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('このVTuberを削除しますか？この操作は取り消せません。')) return
    try {
      await deleteVtuber(id)
      removeMyVtuberId(id)
      setItems((prev) => prev.filter((item) => item.vtuber.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleRemoveFavorite = (id) => {
    toggleFavorite(id)
    setFavorites((prev) => prev.filter((vtuber) => vtuber.id !== id))
  }

  if (loading) return <p className="text-center text-gray-400">読み込み中...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold mb-6">マイページ</h1>

        {items.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="mb-4">登録したVTuberがありません。</p>
            <Link to="/register" className="text-purple-600 font-semibold">
              VTuberを登録する →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map(({ vtuber, viewCount, matchCount }) => (
              <div key={vtuber.id} className="bg-white border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={vtuber.avatar_url || 'https://placehold.co/48x48?text=V'}
                    alt={vtuber.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{vtuber.name}</p>
                  </div>
                  <Link
                    to={`/v/${vtuber.id}`}
                    className="text-sm text-purple-600"
                  >
                    プロフィールを見る
                  </Link>
                  <Link
                    to={`/v/${vtuber.id}/edit`}
                    className="text-sm text-purple-600"
                  >
                    編集
                  </Link>
                  <button
                    onClick={() => handleDelete(vtuber.id)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    削除
                  </button>
                </div>
                <div className="flex gap-6 text-sm text-gray-500">
                  <p>
                    閲覧数: <span className="font-semibold text-gray-900">{viewCount}</span>
                  </p>
                  <p>
                    診断マッチ数: <span className="font-semibold text-gray-900">{matchCount}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">気になるリスト</h2>

        {favorites.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p className="mb-4">気になるに追加したVTuberがありません。</p>
            <Link to="/explore" className="text-purple-600 font-semibold">
              VTuberを探す →
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {favorites.map((vtuber) => (
              <div key={vtuber.id} className="bg-white border rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={vtuber.avatar_url || 'https://placehold.co/48x48?text=V'}
                    alt={vtuber.name}
                    className="w-12 h-12 rounded-full object-cover bg-gray-100"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{vtuber.name}</p>
                  </div>
                  <Link
                    to={`/v/${vtuber.id}`}
                    className="text-sm text-purple-600"
                  >
                    プロフィールを見る
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(vtuber.id)}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
