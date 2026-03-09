# Flow Archive - フロントエンド (Vue.js 版)

Flow Archive のユーザーインターフェースを構築する Vue.js アプリケーションです。
React 版の機能をそのままに、Vue 3 (Composition API) と Vite を使用して再構築されました。

## 🚀 使用技術・ライブラリ

### コア・フレームワーク
- **[Vue.js (v3)](https://vuejs.org/)**: UI コンポーネントの構築 (Composition API)。
- **[TypeScript](https://www.typescriptlang.org/)**: 型安全な開発。
- **[Vite](https://vitejs.dev/)**: 次世代フロントエンドビルドツール。
- **[Vue Router](https://router.vuejs.org/)**: シングルページアプリケーションのルーティング。
- **[TanStack Vue Query](https://tanstack.com/query/latest/docs/framework/vue/overview)**: 非同期データの取得・キャッシュ・同期。

### スタイリング
- **[Tailwind CSS](https://tailwindcss.com/)**: ユーティリティファーストの CSS フレームワーク。
- **[Lucide Vue Next](https://lucide.dev/guide/packages/lucide-vue-next)**: 美しく一貫性のあるアイコンセット。

### 国際化・Markdown
- **[Vue I18n](https://vue-i18n.intlify.dev/)**: 多言語対応。
- **[Vue Markdown Render](https://github.com/Mogery/vue-markdown-render)**: Vue 用の Markdown レンダリング。

## 🛠 機能
- **ナレッジ一覧**: ページネーション対応のグリッド表示。
- **詳細表示**: Markdown レンダリングによる知識の閲覧。
- **作成・編集**: リアルタイムプレビュー機能付きのエディタ。
- **多言語対応**: 日本語をベースとした i18n 対応。

## 🏃 開発手順

### 1. 依存関係のインストール
```bash
cd frontend-vue
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```
デフォルトでは `http://localhost:5173` で起動します。
※React 版とポートが競合する場合は、Vite が自動的に別のポートを割り当てます。

### 3. ビルド（本番用）
```bash
npm run build
```

## 📁 ディレクトリ構造
- `src/components/`: 再利用可能な UI コンポーネント。
- `src/pages/`: 各画面のメインコンポーネント。
- `src/router/`: ルーティング定義。
- `src/locales/`: 翻訳データと i18n 設定。
- `src/types/`: TypeScript の型定義。
- `src/assets/`: CSS や画像などの静的アセット。
