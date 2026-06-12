# Vmap

フォロワー数に関係なく、相性・雰囲気でVTuberを発見できるマッチングサイト。

## セットアップ

1. 依存パッケージをインストール
   ```bash
   npm install
   ```

2. Supabaseプロジェクトを作成し、`supabase/schema.sql` をSQL Editorで実行してテーブルを作成する

3. `.env.example` を `.env.local` にコピーし、SupabaseのURLとAnon Keyを設定する
   ```bash
   cp .env.example .env.local
   ```
   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=xxxx
   ```

4. 開発サーバーを起動
   ```bash
   npm run dev
   ```

## 構成

- `src/pages/` - 各ページ（Home, Quiz, Explore, VTuberDetail, Register, Dashboard）
- `src/lib/` - Supabaseクライアント、API、定数、マッチングロジック
- `supabase/schema.sql` - DBスキーマ（vtubers, favorites, impressions）
