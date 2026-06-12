import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-12">
      <div>
        <h1 className="text-4xl font-bold mb-4">
          フォロワー数じゃなく、<br className="sm:hidden" />
          「相性」でVTuberを見つける
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Vmapは、診断ゲームやタグ検索から、自分にぴったりの推しVTuberを発見できるマッチングサイトです。
          アカウント登録は不要です。
        </p>
      </div>

      <div className="flex gap-4">
        <Link
          to="/quiz"
          className="px-6 py-3 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
        >
          診断をはじめる
        </Link>
        <Link
          to="/explore"
          className="px-6 py-3 rounded-full border border-purple-600 text-purple-600 font-semibold hover:bg-purple-50 transition"
        >
          一覧から探す
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full">
        <FeatureCard
          title="8問の診断"
          desc="スライダーで答えるだけで、あなたに合うVTuberをマッチング度で表示します。"
        />
        <FeatureCard
          title="タグ・ムードで探す"
          desc="ジャンルやキャラクター傾向のタグから絞り込み検索ができます。"
        />
        <FeatureCard
          title="VTuberも自分で登録"
          desc="プロフィールやリンクを登録して、自分のページを管理できます。"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white rounded-xl border p-6 text-left">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}
