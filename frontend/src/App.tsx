import React, { useState, useEffect } from 'react';
import type { Knowledge } from './types/index';

const API_URL = 'http://localhost:8080/api/knowledge';

function App() {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchKnowledges();
  }, []);

  const fetchKnowledges = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setKnowledges(data);
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const knowledge: Knowledge = { title, content };

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledge),
        });
        setEditingId(null);
      } else {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(knowledge),
        });
      }
      setTitle('');
      setContent('');
      fetchKnowledges();
    } catch (error) {
      console.error('保存に失敗しました:', error);
    }
  };

  const handleEdit = (k: Knowledge) => {
    setTitle(k.title);
    setContent(k.content);
    setEditingId(k.id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('本当に削除しますか？')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchKnowledges();
    } catch (error) {
      console.error('削除に失敗しました:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-teal-100">
              <img src="/logo.png" alt="Flow Archive Logo" className="h-16 w-auto" />
            </div>
            <h1 className="text-5xl font-black tracking-tight text-[#0d3b3b]">
              Flow <span className="text-[#1a7a7a]">Archive</span>
            </h1>
          </div>
          <p className="text-lg text-[#4a6b6b] font-medium">知識の流れを、確かな蓄積に。</p>
        </header>

        <div className="grid grid-cols-1 gap-12">
          {/* Form Section */}
          <section className="bg-white rounded-3xl shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden">
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-[#0d3b3b] mb-8 flex items-center gap-3">
                {editingId ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-8 bg-amber-400 rounded-full"></span>
                    ナレッジを編集
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-8 bg-[#1a7a7a] rounded-full"></span>
                    新しいナレッジを追加
                  </span>
                )}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#2c4a4a] mb-2 ml-1">タイトル</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    placeholder="何について記録しますか？"
                    className="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-[#f9fbfb] focus:bg-white focus:ring-4 focus:ring-[#1a7a7a]/10 focus:border-[#1a7a7a] transition-all outline-none placeholder:text-slate-400 text-[#0d3b3b] font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#2c4a4a] mb-2 ml-1">内容</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    placeholder="詳細な情報を入力してください..."
                    rows={6}
                    className="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-[#f9fbfb] focus:bg-white focus:ring-4 focus:ring-[#1a7a7a]/10 focus:border-[#1a7a7a] transition-all outline-none placeholder:text-slate-400 text-[#0d3b3b] font-medium resize-none"
                  />
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className={`flex-1 py-4 px-8 rounded-2xl font-black text-white transition-all transform active:scale-[0.98] shadow-xl ${
                      editingId 
                        ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' 
                        : 'bg-[#1a7a7a] hover:bg-[#0d3b3b] shadow-teal-200'
                    }`}
                  >
                    {editingId ? '更新する' : '作成する'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => { setEditingId(null); setTitle(''); setContent(''); }}
                      className="px-8 py-4 rounded-2xl font-bold text-[#4a6b6b] bg-teal-50 hover:bg-teal-100 transition-all"
                    >
                      キャンセル
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          {/* List Section */}
          <section>
            <div className="flex items-center justify-between mb-10 px-2">
              <h2 className="text-2xl font-black text-[#0d3b3b] flex items-center gap-3">
                <span className="p-2 bg-[#1a7a7a] rounded-xl text-white text-xl">📚</span>
                ナレッジ一覧
              </h2>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-teal-100 shadow-sm">
                <span className="w-2 h-2 bg-[#1a7a7a] rounded-full animate-pulse"></span>
                <span className="text-[#1a7a7a] text-sm font-black">{knowledges.length} <span className="text-xs font-bold text-[#4a6b6b]">ITEMS</span></span>
              </div>
            </div>

            {knowledges.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[2.5rem] border-4 border-dashed border-teal-50">
                <div className="text-6xl mb-4">🍃</div>
                <p className="text-[#4a6b6b] font-bold text-xl">まだナレッジが登録されていません。</p>
                <p className="text-slate-400 text-sm mt-2 font-medium">上のフォームから最初の知識を記録しましょう。</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {knowledges.map((k) => (
                  <div key={k.id} className="group bg-white rounded-[2rem] p-8 shadow-xl shadow-teal-900/5 border border-teal-50 hover:border-[#1a7a7a]/20 hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full -mr-16 -mt-16 group-hover:bg-[#1a7a7a]/5 transition-colors duration-500"></div>
                    
                    <div className="flex-grow relative z-10">
                      <h3 className="text-2xl font-black text-[#0d3b3b] mb-4 group-hover:text-[#1a7a7a] transition-colors line-clamp-2 leading-tight">
                        {k.title}
                      </h3>
                      <p className="text-[#4a6b6b] leading-relaxed mb-6 line-clamp-5 whitespace-pre-wrap font-medium">
                        {k.content}
                      </p>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-teal-50 relative z-10">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">
                        <span className="w-4 h-[1px] bg-teal-100"></span>
                        登録: {k.createdAt ? new Date(k.createdAt).toLocaleString('ja-JP') : '-'}
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(k)}
                          className="flex-1 py-3 px-4 rounded-xl bg-amber-50 text-amber-700 font-black text-xs hover:bg-amber-100 transition-all uppercase tracking-widest"
                        >
                          編集
                        </button>
                        <button
                          onClick={() => k.id && handleDelete(k.id)}
                          className="flex-1 py-3 px-4 rounded-xl bg-rose-50 text-red-600 font-black text-xs hover:bg-rose-100 transition-all uppercase tracking-widest"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      
      <footer className="mt-20 text-center text-slate-400 text-xs font-bold tracking-[0.3em] uppercase">
        &copy; 2026 Flow Archive Project
      </footer>
    </div>
  );
}

export default App;
