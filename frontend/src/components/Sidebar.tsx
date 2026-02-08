import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Settings, Github, Database } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { to: '/', icon: <LayoutDashboard size={22} />, label: 'ダッシュボード' },
    { to: '/new', icon: <PlusCircle size={22} />, label: '新規作成' },
  ];

  return (
    <aside className="w-72 bg-[#0d3b3b] text-white flex flex-col h-screen sticky top-0 shadow-2xl">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-white p-2 rounded-xl shadow-lg shadow-black/20">
            <img src="/logo.png" alt="Flow Archive" className="h-8 w-auto" />
          </div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">
            Flow <span className="text-teal-400">Archive</span>
          </h1>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30 shadow-lg shadow-teal-900/20'
                    : 'text-teal-100/50 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 space-y-6">
        <div className="p-6 bg-white/5 rounded-[2rem] border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <Database size={18} className="text-teal-400" />
            <span className="text-xs font-black uppercase tracking-widest text-teal-100/50">System Status</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold">PostgreSQL Connected</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <button className="p-2 text-teal-100/30 hover:text-white transition-colors">
            <Settings size={20} />
          </button>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="p-2 text-teal-100/30 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
