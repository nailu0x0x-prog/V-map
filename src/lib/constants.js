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

// キャラクタータグ
export const CHARACTER_TAGS = [
  'お兄さん系',
  'お姉さん系',
  '少年系',
  '少女系',
  '性別不詳',
  '人外',
  'ケモ耳',
  '天使系',
  '悪魔系',
  '和風',
  'ファンタジー',
  'メカ',
  '海・人魚',
  '魔法使い',
  '宇宙系',
]

// 声タグ
export const VOICE_TAGS = [
  '低音ボイス',
  '高音ボイス',
  '中低音ボイス',
  '中性ボイス',
  'ショタボイス',
  'ロリボイス',
  '癒し系ボイス',
  '個性的ボイス',
  '関西弁',
  'ご当地方言',
]

// 活動方針タグ
export const ACTIVITY_TAGS = [
  '歌枠',
  'ゲーム実況',
  'ゲームメイン',
  '雑談メイン',
  '企画もの',
  'コラボ多め',
  'ASMR',
  'お絵描き',
  'クリエイティブ活動',
  '料理',
  'スポーツ',
  '動画',
  '配信',
]

// 活動場所タグ
export const PLATFORM_TAGS = [
  'YouTube',
  'ツイキャス',
  'X',
  'Twitch',
  'IRIAM',
  'TikTok',
  'その他',
]

export const ALL_TAGS = [
  ...MOODS,
  ...CHARACTER_TAGS,
  ...VOICE_TAGS,
  ...ACTIVITY_TAGS,
  ...PLATFORM_TAGS,
]

// タグ選択UIをグループ表示するための定義
export const TAG_GROUPS = [
  { label: 'ムード', tags: MOODS },
  { label: 'キャラ', tags: CHARACTER_TAGS },
  { label: '声', tags: VOICE_TAGS },
  { label: '活動方針', tags: ACTIVITY_TAGS },
  { label: '活動場所', tags: PLATFORM_TAGS },
]

export const MAX_TAGS = 15

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
