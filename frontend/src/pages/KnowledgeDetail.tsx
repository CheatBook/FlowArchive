import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeft, Edit, Calendar, Clock } from 'lucide-react';
import type { Knowledge } from '../types/index';

const API_URL = 'http://localhost:8080/api/knowledge';

const KnowledgeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);

  useEffect(() => {
    if (id) {
      fetchKnowledge(id);
    }
  }, [id]);

  const fetchKnowledge = async (knowledgeId: string) => {
    try {
      const response = await fetch(`${API_URL}/${knowledgeId}`);
      if (response.ok) {
        const data = await response.json();
        setKnowledge(data);
      }
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  if (!knowledge) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a7a7a]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-[#4a6b6b] hover:text-[#1a7a7a] font-bold mb-8 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        一覧に戻る
      </button>

      <article className="bg-white rounded-[2.5rem] shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden">
        <div className="p-8 sm:p-12">
          <header className="mb-10 pb-8 border-b border-teal-50">
            <h1 className="text-4xl font-black text-[#0d3b3b] mb-6 leading-tight">
              {knowledge.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                作成: {knowledge.createdAt ? new Date(knowledge.createdAt).toLocaleString('ja-JP') : '-'}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                更新: {knowledge.updatedAt ? new Date(knowledge.updatedAt).toLocaleString('ja-JP') : '-'}
              </div>
            </div>
          </header>

          <div className="prose prose-teal max-w-none prose-headings:text-[#0d3b3b] prose-headings:font-black prose-a:text-[#1a7a7a] prose-strong:text-[#0d3b3b]">
            <MarkdownRenderer content={knowledge.content} />
          </div>

          <div className="mt-12 pt-8 border-t border-teal-50 flex justify-end">
            <button
              onClick={() => navigate(`/edit/${knowledge.id}`)}
              className="flex items-center gap-2 px-8 py-3 bg-amber-50 text-amber-700 rounded-2xl font-black hover:bg-amber-100 transition-all shadow-sm"
            >
              <Edit size={20} />
              このナレッジを編集する
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default KnowledgeDetail;
