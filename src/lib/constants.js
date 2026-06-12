// ムードタグ
export const MOODS = [
  '元気系',
  'クール系',
  'まったり',
  'パワー系',
  '歌メイン',
  'ガチャ系',
  '深夜系',
  '癒し系',
]

// キャラクタータグ例
export const CHARACTER_TAGS = [
  'メンヘラ',
  '少年系',
  '悪魔系',
  '和風',
  '深海',
  'ファンタジー異世界',
  '生徒系',
  '魔法少女',
]

export const ALL_TAGS = [...MOODS, ...CHARACTER_TAGS]

export const MAX_TAGS = 10

// 診断8問（スライダー 0〜1）
export const QUIZ_QUESTIONS = [
  { id: 1, question: '配信の雰囲気', left: '元気系', right: 'クール系' },
  { id: 2, question: '好きなコンテンツ', left: 'ゲーム', right: '歌・雑談' },
  { id: 3, question: '声のトーン', left: 'やわらか', right: 'はっきり' },
  { id: 4, question: '配信時間帯', left: '昼', right: '深夜' },
  { id: 5, question: 'キャラの見た目', left: '可愛い', right: 'かっこいい' },
  { id: 6, question: 'トーク傾向', left: '聞き役', right: '話し役' },
  { id: 7, question: '配信の長さ', left: '短め', right: '長め' },
  { id: 8, question: 'リスナーとの距離感', left: 'べったり', right: '適度に距離感' },
]
