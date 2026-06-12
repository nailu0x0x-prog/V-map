import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerVtuber } from '../lib/api'
import { addMyVtuberId } from '../lib/myVtubers'
import { ALL_TAGS, MOODS, MAX_TAGS, QUIZ_QUESTIONS } from '../lib/constants'

const LINK_FIELDS = [
  { key: 'youtube', label: 'YouTube' },
  { key: 'twitch', label: 'Twitch' },
  { key: 'twitcasting', label: 'ツイキャス' },
  { key: 'x', label: 'X' },
]

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    bio: '',
    avatar_url: '',
    mood: '',
  })
  const [links, setLinks] = useState({})
  const [tags, setTags] = useState([])
  const [vector, setVector] = useState(Array(QUIZ_QUESTIONS.length).fill(0.5))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLinkChange = (key, value) => {
    setLinks((prev) => ({ ...prev, [key]: value }))
  }

  const toggleTag = (tag) => {
    setTags((prev) => {
      if (prev.includes(tag)) return prev.filter((t) => t !== tag)
      if (prev.length >= MAX_TAGS) return prev
      return [...prev, tag]
    })
  }

  const handleVectorChange = (index, value) => {
    setVector((prev) => {
      const next = [...prev]
      next[index] = Number(value)
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('名前を入力してください')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const vtuber = await registerVtuber({
        name: form.name,
        bio: form.bio,
        avatar_url: form.avatar_url,
        mood: form.mood || null,
        tags,
        links,
        vector,
      })
      addMyVtuberId(vtuber.id)
      navigate(`/v/${vtuber.id}`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">VTuber登録</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <Field label="名前 *">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </Field>

        <Field label="一言紹介">
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
        </Field>

        <Field label="アイコン画像URL">
          <input
            name="avatar_url"
            value={form.avatar_url}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="https://..."
          />
        </Field>

        <Field label="ムード">
          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">選択してください</option>
            {MOODS.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </Field>

        <Field label={`タグ（最大${MAX_TAGS}個）`}>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`text-sm px-3 py-1 rounded-full border transition ${
                  tags.includes(tag)
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 text-gray-600 hover:border-purple-400'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">{tags.length} / {MAX_TAGS}</p>
        </Field>

        <Field label="活動リンク">
          <div className="flex flex-col gap-2">
            {LINK_FIELDS.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <span className="w-24 text-sm text-gray-500">{label}</span>
                <input
                  value={links[key] || ''}
                  onChange={(e) => handleLinkChange(key, e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                  placeholder="https://..."
                />
              </div>
            ))}
          </div>
        </Field>

        <Field label="診断用プロフィール（あなたのキャラクターの傾向）">
          <div className="flex flex-col gap-4">
            {QUIZ_QUESTIONS.map((q, i) => (
              <div key={q.id}>
                <p className="text-sm font-semibold mb-1">
                  Q{q.id}. {q.question}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="w-24 text-right">{q.left}</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={vector[i]}
                    onChange={(e) => handleVectorChange(i, e.target.value)}
                    className="flex-1 accent-purple-600"
                  />
                  <span className="w-24">{q.right}</span>
                </div>
              </div>
            ))}
          </div>
        </Field>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-50"
        >
          {submitting ? '登録中...' : '登録する'}
        </button>
      </form>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">{label}</label>
      {children}
    </div>
  )
}
