import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QUIZ_QUESTIONS, GENDERS } from '../lib/constants'

export default function Quiz() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState(
    Array(QUIZ_QUESTIONS.length).fill(0.5),
  )
  const [gender, setGender] = useState('')

  const handleChange = (index, value) => {
    setAnswers((prev) => {
      const next = [...prev]
      next[index] = Number(value)
      return next
    })
  }

  const handleSubmit = () => {
    navigate('/explore', { state: { answers, gender } })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">相性診断</h1>
      <p className="text-gray-500 mb-8">
        各項目について、自分の好みに近い位置にスライダーを動かしてください。
      </p>

      <div className="flex flex-col gap-8">
        {QUIZ_QUESTIONS.map((q, i) => (
          <div key={q.id}>
            <p className="font-semibold mb-2">
              Q{q.id}. {q.question}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="w-24 text-right">{q.left}</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                className="flex-1 accent-purple-600"
              />
              <span className="w-24">{q.right}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="font-semibold mb-2">好みの性別（任意）</p>
        <div className="flex flex-wrap gap-2">
          {GENDERS.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGender((prev) => (prev === g ? '' : g))}
              className={`text-sm px-3 py-1 rounded-full border transition ${
                gender === g
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'border-gray-300 text-gray-600 hover:border-purple-400'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          結果を見る
        </button>
      </div>
    </div>
  )
}
