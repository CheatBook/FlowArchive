# Sidebar.tsx 超詳細解説

画面の左側に固定されているナビゲーションメニューの解説です。

```tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Database, Github, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * 【Sidebar コンポーネント】
 */
const Sidebar: React.FC = () => {
  // 11行目: 多言語対応ライブラリから翻訳関数 t を取得します。
  const { t } = useTranslation();

  return (
    // 15行目: aside タグを使用。sticky で画面左に固定し、h-screen で高さを画面いっぱいにします。
    <aside className="w-72 bg-[#0d3b3b] text-white flex flex-col sticky top-0 h-screen shadow-2xl z-20">
      
      {/* ロゴエリア */}
      <div className="p-8">
        <div className="flex items-center gap-4 mb-10">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
          <h1 className="text-xl font-black tracking-tighter">FLOW ARCHIVE</h1>
        </div>

        {/* ナビゲーションリンク */}
        <nav className="space-y-3">
          {/* 
            NavLink は React Router の特別なリンクです。
            to="/" が現在のURLと一致している場合、自動的に isActive が true になります。
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
            {/* ja.json の sidebar.dashboard に定義された文字を表示します */}
            {t('sidebar.dashboard')}
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
            {t('sidebar.new_create')}
          </NavLink>
        </nav>
      </div>

      {/* システムステータス（下部固定） */}
      <div className="mt-auto p-6">
        <div className="bg-white/5 rounded-[2rem] p-6 border border-white/10">
          <div className="flex items-center gap-2 text-teal-400 mb-4">
            <Database size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('common.system_status')}</span>
          </div>
          {/* ...ステータス表示... */}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
```
