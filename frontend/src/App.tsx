import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import KnowledgeList from './pages/KnowledgeList';
import KnowledgeForm from './pages/KnowledgeForm';
import KnowledgeDetail from './pages/KnowledgeDetail';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#f0f4f4]">
        {/* サイドメニュー */}
        <Sidebar />

        {/* メインコンテンツ */}
        <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
          <div className="animate-in fade-in duration-500">
            <Routes>
              <Route path="/" element={<KnowledgeList />} />
              <Route path="/new" element={<KnowledgeForm />} />
              <Route path="/edit/:id" element={<KnowledgeForm />} />
              <Route path="/knowledge/:id" element={<KnowledgeDetail />} />
            </Routes>
          </div>
          
          <footer className="mt-20 text-center text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">
            &copy; 2026 Flow Archive Project / Knowledge Management System
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;
