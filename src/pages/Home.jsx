import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center gap-8 py-12">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-bold mb-4">
          フォロワー数じゃなく、<br className="sm:hidden" />
          <span className="bg-gradient-to-r from-[#ff005d] via-[#ff00d4] to-[#ff005d] bg-clip-text text-transparent animate-gradient">
            「相性」
          </span>
          でVTuberを見つける
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Vmapは、診断ゲームやタグ検索から、自分にぴったりの推しVTuberを発見できるマッチングサイトです。
          アカウント登録は不要です。
        </p>
      </div>

      <div
        className="flex gap-4 animate-fade-in-up"
        style={{ animationDelay: '0.15s' }}
      >
        <Link
          to="/quiz"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff005d] to-[#ff00d4] text-white font-semibold transition hover:opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30 active:scale-95"
        >
          診断をはじめる
        </Link>
        <Link
          to="/explore"
          className="px-6 py-3 rounded-full border border-[#ff005d] text-[#ff005d] font-semibold transition hover:bg-pink-50 hover:scale-105 active:scale-95"
        >
          一覧から探す
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 w-full">
        <FeatureCard
          title="8問の診断"
          desc="スライダーで答えるだけで、あなたに合うVTuberをマッチング度で表示します。"
          delay="0.3s"
        />
        <FeatureCard
          title="タグ・ムードで探す"
          desc="ジャンルやキャラクター傾向のタグから絞り込み検索ができます。"
          delay="0.4s"
        />
        <FeatureCard
          title="VTuberも自分で登録"
          desc="プロフィールやリンクを登録して、自分のページを管理できます。"
          delay="0.5s"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, desc, delay }) {
  return (
    <div
      className="bg-white rounded-xl border p-6 text-left animate-fade-in-up transition hover:-translate-y-1 hover:shadow-lg hover:border-pink-200"
      style={{ animationDelay: delay }}
    >
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}
