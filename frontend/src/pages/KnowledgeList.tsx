import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, BookOpen, Clock, ChevronRight } from 'lucide-react';
import type { Knowledge } from '../types/index';

const API_URL = 'http://localhost:8080/api/knowledge';

const KnowledgeList: React.FC = () => {
  const [knowledges, setKnowledges] = useState<Knowledge[]>([]);
  const navigate = useNavigate();

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

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 親のクリックイベント（詳細遷移）を防止
    if (!window.confirm('本当に削除しますか？')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchKnowledges();
    } catch (error) {
      console.error('削除に失敗しました:', error);
    }
  };

  const handleEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); // 親のクリックイベントを防止
    navigate(`/edit/${id}`);
  };

  // テキストの抜粋を作成する関数
  const getExcerpt = (text: string, maxLength: number = 150) => {
    // Markdownの記号を簡易的に除去（プレーンテキストに近い状態にする）
    const plainText = text.replace(/[#*`[\]()]/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10 px-2">
        <h2 className="text-3xl font-black text-[#0d3b3b] flex items-center gap-3">
          <span className="p-2 bg-[#1a7a7a] rounded-xl text-white shadow-lg shadow-teal-200">
            <BookOpen size={28} />
          </span>
          ナレッジ一覧
        </h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-teal-100 shadow-sm">
            <span className="w-2 h-2 bg-[#1a7a7a] rounded-full animate-pulse"></span>
            <span className="text-[#1a7a7a] text-sm font-black">
              {knowledges.length} <span className="text-xs font-bold text-[#4a6b6b]">ITEMS</span>
            </span>
          </div>
          <button
            onClick={() => navigate('/new')}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#1a7a7a] hover:bg-[#0d3b3b] text-white rounded-xl font-bold transition-all shadow-lg shadow-teal-100 active:scale-95"
          >
            <Plus size={20} /> 新規作成
          </button>
        </div>
      </div>

      {knowledges.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-teal-50">
          <div className="text-7xl mb-6 opacity-20">🍃</div>
          <p className="text-[#4a6b6b] font-bold text-2xl">まだナレッジが登録されていません。</p>
          <p className="text-slate-400 text-lg mt-3 font-medium">新しい知識を記録して、アーカイブを充実させましょう。</p>
          <button
            onClick={() => navigate('/new')}
            className="mt-8 px-8 py-3 bg-teal-50 text-[#1a7a7a] rounded-2xl font-black hover:bg-teal-100 transition-all"
          >
            最初のナレッジを作成する
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {knowledges.map((k) => (
            <div 
              key={k.id} 
              onClick={() => navigate(`/knowledge/${k.id}`)}
              className="group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-teal-900/5 border border-teal-50 hover:border-[#1a7a7a]/20 hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 flex flex-col relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50/30 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
              
              <div className="flex-grow relative z-10">
                <h3 className="text-2xl font-black text-[#0d3b3b] mb-4 group-hover:text-[#1a7a7a] transition-colors line-clamp-2 leading-tight">
                  {k.title}
                </h3>
                <p className="text-[#4a6b6b] leading-relaxed mb-6 line-clamp-3 font-medium text-sm">
                  {getExcerpt(k.content)}
                </p>
                <div className="flex items-center gap-1 text-[#1a7a7a] font-bold text-sm mb-8 group-hover:gap-2 transition-all">
                  詳細を見る <ChevronRight size={16} />
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-teal-50 relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <Clock size={12} />
                  {k.createdAt ? new Date(k.createdAt).toLocaleDateString('ja-JP') : '-'}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => k.id && handleEdit(e, k.id)}
                    className="p-2.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all"
                    title="編集"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => k.id && handleDelete(e, k.id)}
                    className="p-2.5 rounded-xl bg-rose-50 text-red-600 hover:bg-rose-100 transition-all"
                    title="削除"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KnowledgeList;
