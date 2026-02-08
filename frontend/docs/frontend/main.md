# main.tsx 超詳細解説

このファイルは、Reactアプリケーションがブラウザで動き出す「最初の入り口」です。

```tsx
// 1-2行目: Reactの基本機能を読み込みます。
// StrictModeは開発中に潜在的な問題を警告してくれるモードです。
// createRootはブラウザのHTML要素の中にReactを描画するための関数です。
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// 3-4行目: TanStack Query（キャッシュ管理）の機能を読み込みます。
// QueryClient: 通信データやキャッシュのルールを管理する本体。
// QueryClientProvider: アプリ全体でその機能を使えるようにする囲い（プロバイダー）。
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// ReactQueryDevtools: 開発時のみ画面右下に表示されるデバッグツール。
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// 5-7行目: デザイン(CSS)、多言語対応(i18n)、メイン部品(App)を読み込みます。
import './index.css'
import './i18n' // i18n 設定を読み込み
import App from './App.tsx'

// 10-18行目: キャッシュの設定（QueryClient）を作成します。
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5分間はデータを「最新」とみなし、その間は同じ画面を開いても再取得（通信）を控え、キャッシュを表示します。
      staleTime: 1000 * 60 * 5, 
      // インターネットの瞬断などで通信に失敗した時、1回だけ自動でリトライします。
      retry: 1, 
    },
  },
})

// 20行目: HTML（index.html）にある "root" というIDの要素を探し、そこにReactを描画する準備をします。
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* アプリ全体を QueryClientProvider で包むことで、どの画面からでもキャッシュ機能が使えるようになります。 */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* 開発中だけ表示されるツールです。キャッシュの状態がリアルタイムで分かります。 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
)
```
