import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import KnowledgeList from './pages/KnowledgeList';
import KnowledgeForm from './pages/KnowledgeForm';
import KnowledgeDetail from './pages/KnowledgeDetail';

/**
 * 【App コンポーネント】
 * 
 * アプリケーションの「司令塔」です。
 * 画面全体のレイアウト（サイドバー＋メインエリア）と、
 * どの URL の時にどの画面（ページ）を表示するかを決定します。
 */
function App() {
  return (
    /**
     * <Router>: 
     * ブラウザの URL と React の画面を連動させるための「魔法の箱」です。
     * これで囲まれた中では、ページをリロードせずに画面を切り替えられます。
     */
    <Router>
      {/* 
        flex: CSS の Flexbox レイアウトを使用。
        サイドバーとメインコンテンツを横並びに配置します。
      */}
      <div className="flex min-h-screen bg-[#f0f4f4]">
        {/* 
          <Sidebar />: 
          画面左側に常に表示されるメニューです。
          components/Sidebar.tsx で定義されています。
        */}
        <Sidebar />

        {/* 
          <main>: 
          画面の右側（メインエリア）です。
          flex-1 を指定することで、サイドバー以外の残り全ての幅を占領します。
        */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          
          {/* Tailwind のアニメーションクラスを使用して、画面切り替え時にフワッと表示させます */}
          <div className="animate-in fade-in duration-500">
            
            {/* 
              <Routes>: 
              この中で「URL パス」と「表示するページ」のペアを定義します。
            */}
            <Routes>
              {/* パスが "/"（トップページ）の時は、一覧画面を表示 */}
              <Route path="/" element={<KnowledgeList />} />
              
              {/* パスが "/new" の時は、新規作成フォームを表示 */}
              <Route path="/new" element={<KnowledgeForm />} />
              
              {/* 
                パスが "/edit/123" などの時は、編集フォームを表示。
                ":id" は変数（パラメータ）として扱われます。
              */}
              <Route path="/edit/:id" element={<KnowledgeForm />} />
              
              {/* パスが "/knowledge/123" などの時は、詳細画面を表示 */}
              <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
            </Routes>
          </div>
          
          {/* フッター：全ページ共通で一番下に表示されます */}
          <footer className="mt-20 text-center text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">
            &copy; 2026 Flow Archive Project / Knowledge Management System
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;
