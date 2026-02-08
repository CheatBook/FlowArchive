# Flow Archive - フロントエンド

Flow Archive のユーザーインターフェースを構築する React アプリケーションです。
Vite をビルドツールとして採用し、高速な開発環境とモダンな UI/UX を提供します。

## 🚀 使用技術・ライブラリ

### コア・フレームワーク
- **[React](https://reactjs.org/)**: UI コンポーネントの構築。
- **[TypeScript](https://www.typescriptlang.org/)**: 型安全な開発。
- **[Vite](https://vitejs.dev/)**: 次世代フロントエンドビルドツール。

### スタイリング
- **[Tailwind CSS (v4)](https://tailwindcss.com/)**: ユーティリティファーストの CSS フレームワーク。深い青緑色を基調としたモダンなデザインを実現。
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)**: Markdown コンテンツを美しく表示するための公式プラグイン（`prose` クラス）。
- **[PostCSS](https://postcss.org/) / [Autoprefixer](https://github.com/postcss/autoprefixer)**: CSS の自動最適化とベンダープレフィックスの付与。

### Markdown 関連
- **[react-markdown](https://github.com/remarkjs/react-markdown)**: React 用の Markdown レンダリングコンポーネント。
- **[remark-gfm](https://github.com/remarkjs/remark-gfm)**: GitHub Flavored Markdown（テーブル、チェックリスト等）のサポート。
- **[react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)**: コードブロックのシンタックスハイライト。Java などの言語色分けに使用。

## 🛠 機能
- **Markdown エディタ**: リアルタイムプレビュー機能付きの入力フォーム。
- **ナレッジ管理**: タイトルと Markdown コンテンツの作成・編集・削除。
- **レスポンシブデザイン**: PC、タブレット、スマートフォンに対応したグリッドレイアウト。
- **自動保存連携**: バックエンドの REST API と連携したデータの永続化。

## 🏃 開発手順

### 1. 依存関係のインストール
```bash
npm install
```

### 2. 開発サーバーの起動
```bash
npm run dev
```
デフォルトでは `http://localhost:5173` で起動します。

### 3. ビルド（本番用）
```bash
npm run build
```

## 📁 ディレクトリ構造
- `src/components/`: 再利用可能な UI コンポーネント（将来用）。
- `src/types/`: TypeScript の型定義。
- `src/App.tsx`: メインのアプリケーションロジックと UI 定義。
- `src/index.css`: Tailwind CSS のインポートとグローバルスタイル。
- `public/`: ロゴ画像などの静的アセット。
