# App.tsx 超詳細解説

このファイルは、URLに応じてどの画面を表示するかを管理する「地図（ルーティング）」の役割を果たします。

```tsx
// 1-6行目: 必要なライブラリや各画面（pages）、部品（components）を読み込みます。
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import KnowledgeList from './pages/KnowledgeList';
import KnowledgeForm from './pages/KnowledgeForm';
import KnowledgeDetail from './pages/KnowledgeDetail';

/**
 * 【App コンポーネント】
 * アプリケーションの最上位に位置し、全体のレイアウトを決定します。
 */
function App() {
  return (
    // 22行目: <Router> で囲むことで、ブラウザのURLとReactの画面連動を有効にします。
    <Router>
      {/* 27行目: CSSの flex レイアウトを使い、サイドバー（左）とメインエリア（右）を横並びにします。 */}
      <div className="flex min-h-screen bg-[#f0f4f4]">
        
        {/* 34行目: 左側に常に表示されるサイドバー部品を配置します。 */}
        <Sidebar />

        {/* 41行目: 右側のメインコンテンツエリアです。flex-1 で残りの幅を全て占領します。 */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          
          {/* 44行目: 画面切り替え時にフワッと表示させるアニメーション用のdivです。 */}
          <div className="animate-in fade-in duration-500">
            
            {/* 50行目: <Routes> の中で、特定のURLパスに対してどの画面を出すか定義します。 */}
            <Routes>
              {/* path="/"（トップページ）の時は KnowledgeList（一覧）を表示します。 */}
              <Route path="/" element={<KnowledgeList />} />
              
              {/* path="/new" の時は新規作成用の KnowledgeForm を表示します。 */}
              <Route path="/new" element={<KnowledgeForm />} />
              
              {/* path="/edit/:id"（編集）。:id は記事番号が入る変数（パラメータ）です。 */}
              <Route path="/edit/:id" element={<KnowledgeForm />} />
              
              {/* path="/knowledge/:id"（詳細）。特定の記事を1件表示します。 */}
              <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
            </Routes>
          </div>
          
          {/* 69行目: 全ページ共通で一番下に表示されるフッターです。 */}
          <footer className="mt-20 text-center text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">
            &copy; 2026 Flow Archive Project / Knowledge Management System
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;
```
