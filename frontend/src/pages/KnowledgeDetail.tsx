import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeft, Edit, Clock, Calendar, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import type { Knowledge } from '../types/index';

const API_URL = 'http://localhost:8080/api/knowledge';

/**
 * 特定のナレッジを 1件取得する関数
 */
const fetchKnowledge = async (id: string): Promise<Knowledge> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Knowledge not found');
  return response.json();
};

/**
 * 【KnowledgeDetail コンポーネント】
 * 
 * TanStack Query を使用して 1件のデータを取得・管理します。
 */
const KnowledgeDetail: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  /**
   * [データ取得：useQuery]
   * id が存在する場合のみ実行されるように設定。
   */
  const { data: knowledge, isLoading, isError } = useQuery({
    queryKey: ['knowledge', id],
    queryFn: () => fetchKnowledge(id!),
    enabled: !!id, // id がある時だけ実行
  });

  // 読み込み中の表示
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-[#1a7a7a]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold">{t('common.loading')}</p>
      </div>
    );
  }

  // エラー時、またはデータが見つからない場合
  if (isError || !knowledge) {
    return (
      <div className="text-center py-32">
        <p className="text-rose-600 font-bold text-xl">ナレッジが見つかりませんでした。</p>
        <button onClick={() => navigate('/')} className="mt-4 text-[#1a7a7a] font-bold">
          一覧に戻る
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 戻るボタン */}
      <button
        onClick={() => navigate('/')}
        className="group flex items-center gap-2 text-[#1a7a7a] font-bold mb-8 hover:text-[#0d3b3b] transition-colors"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        {t('common.back_to_list')}
      </button>

      <article className="bg-white rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden">
        {/* 記事のヘッダー部分 */}
        <header className="px-10 py-12 border-b border-teal-50 bg-[#f9fbfb]">
          <h1 className="text-4xl font-black text-[#0d3b3b] mb-6 leading-tight">
            {knowledge.title}
          </h1>
          
          {/* 日付などのメタ情報 */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
              <Calendar size={14} className="text-[#1a7a7a]" />
              {t('knowledge.created_at')}: {knowledge.createdAt ? new Date(knowledge.createdAt).toLocaleDateString('ja-JP') : '-'}
            </div>
            {knowledge.updatedAt && (
              <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                <Clock size={14} className="text-amber-500" />
                {t('knowledge.updated_at')}: {new Date(knowledge.updatedAt).toLocaleDateString('ja-JP')}
              </div>
            )}
          </div>
        </header>

        {/* 記事の本文部分：Markdown 形式で表示 */}
        <div className="px-10 py-12">
          <div className="prose prose-teal prose-lg max-w-none">
            <MarkdownRenderer content={knowledge.content} />
          </div>
        </div>

        {/* 記事下部の編集ボタン */}
        <footer className="px-10 py-8 bg-teal-50/50 border-t border-teal-50 flex justify-end">
          <button
            onClick={() => navigate(`/edit/${knowledge.id}`)}
            className="flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#1a7a7a] text-[#1a7a7a] rounded-2xl font-black hover:bg-[#1a7a7a] hover:text-white transition-all shadow-lg shadow-teal-900/5 active:scale-95"
          >
            <Edit size={20} />
            {t('knowledge.edit_this')}
          </button>
        </footer>
      </article>
    </div>
  );
};

export default KnowledgeDetail;
