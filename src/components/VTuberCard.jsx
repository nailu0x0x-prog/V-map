import { Link } from 'react-router-dom'

export default function VTuberCard({ vtuber, matchScore }) {
  return (
    <Link
      to={`/v/${vtuber.id}`}
      className="bg-white rounded-xl border p-4 flex flex-col gap-3 hover:shadow-md transition"
    >
      <div className="flex items-center gap-3">
        <img
          src={vtuber.avatar_url || 'https://placehold.co/64x64?text=V'}
          alt={vtuber.name}
          className="w-14 h-14 rounded-full object-cover bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate">{vtuber.name}</p>
          <div className="flex items-center gap-2">
            {vtuber.mood && (
              <p className="text-xs text-purple-600">{vtuber.mood}</p>
            )}
            {vtuber.gender && (
              <p className="text-xs text-gray-400">{vtuber.gender}</p>
            )}
          </div>
        </div>
        {typeof matchScore === 'number' && (
          <div className="text-right shrink-0">
            <p className="text-xs text-gray-400">マッチ度</p>
            <p className="font-bold text-purple-600">
              {Math.round(Math.max(matchScore, 0) * 100)}%
            </p>
          </div>
        )}
      </div>
      {vtuber.bio && (
        <p className="text-sm text-gray-500 line-clamp-2">{vtuber.bio}</p>
      )}
      {vtuber.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {vtuber.tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
