import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Database, Github, Info } from 'lucide-react';

/**
 * 【Sidebar コンポーネント】
 * 
 * 画面左側に固定されるナビゲーションメニューです。
 */
const Sidebar: React.FC = () => {
  return (
    <aside className="w-72 bg-[#0d3b3b] text-white flex flex-col sticky top-0 h-screen shadow-2xl z-20">
      
      {/* ロゴとアプリ名エリア */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-10">
          <div className="relative">
            {/* ロゴ画像 */}
            <img src="/logo.png" alt="Flow Archive Logo" className="w-12 h-12 object-contain relative z-10" />
            {/* ロゴの後ろの光るエフェクト */}
            <div className="absolute inset-0 bg-teal-400 blur-xl opacity-20 animate-pulse"></div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter leading-none">
              FLOW<br /><span className="text-teal-400">ARCHIVE</span>
            </h1>
          </div>
        </div>

        {/* ナビゲーションリンク */}
        <nav className="space-y-3">
          {/* 
            NavLink: React Router の特別なリンク。
            現在表示中のページのリンクに自動で "isActive" クラスをつけてくれます。
          */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                isActive 
                  ? 'bg-teal-400 text-[#0d3b3b] shadow-lg shadow-teal-400/20 scale-[1.02]' 
                  : 'text-teal-100/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <LayoutDashboard size={20} />
            ダッシュボード
          </NavLink>

          <NavLink
            to="/new"
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${
                isActive 
                  ? 'bg-teal-400 text-[#0d3b3b] shadow-lg shadow-teal-400/20 scale-[1.02]' 
                  : 'text-teal-100/60 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <PlusCircle size={20} />
            新規作成
          </NavLink>
        </nav>
      </div>

      {/* サイドバー下部のシステム情報エリア */}
      <div className="mt-auto p-6">
        <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10">
          <div className="flex items-center gap-2 text-teal-400 mb-4">
            <Database size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">System Status</span>
          </div>
          
          <div className="space-y-4">
            {/* DB 接続情報のダミー表示 */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-100/40">DATABASE</span>
              <span className="text-[10px] font-black text-teal-400">CONNECTED</span>
            </div>
            {/* バージョン情報のダミー表示 */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-teal-100/40">VERSION</span>
              <span className="text-[10px] font-black text-white">v1.0.4-STABLE</span>
            </div>
          </div>
          
          {/* 外部リンクなどのアイコン */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-white/5">
            <button className="p-2 rounded-lg bg-white/5 text-teal-100/40 hover:text-white transition-colors">
              <Github size={16} />
            </button>
            <button className="p-2 rounded-lg bg-white/5 text-teal-100/40 hover:text-white transition-colors">
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
