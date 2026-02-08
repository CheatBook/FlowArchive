import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ArrowLeft, Edit, Clock, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Knowledge } from '../types/index';

const API_URL = 'http://localhost:8080/api/knowledge';

/**
 * 【KnowledgeDetail コンポーネント】
 * 
 * 特定のナレッジをフルサイズで表示する詳細ページです。
 */
const KnowledgeDetail: React.FC = () => {
  const { t } = useTranslation();
  // URL パラメータから ID を取得
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // 取得したナレッジデータを保存する State
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);

  /**
   * 画面表示時にデータを取得
   */
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
      } else {
        // 見つからなかった場合は一覧に戻す
        navigate('/');
      }
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  // データ取得中は何も表示しない（またはローディング表示を出す）
  if (!knowledge) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 戻るボタン */}
      <button
        onClick={() => navigate('/')}
        className="group flex items-center gap-2 text-[#1a7a7a] font-bold mb-8 hover:text-[#0d3b3b] transition-colors"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        一覧に戻る
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
              作成: {knowledge.createdAt ? new Date(knowledge.createdAt).toLocaleDateString('ja-JP') : '-'}
            </div>
            {knowledge.updatedAt && (
              <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                <Clock size={14} className="text-amber-500" />
                更新: {new Date(knowledge.updatedAt).toLocaleDateString('ja-JP')}
              </div>
            )}
          </div>
        </header>

        {/* 記事の本文部分：Markdown 形式で表示 */}
        <div className="px-10 py-12">
          <div className="prose prose-teal prose-lg max-w-none">
            {/* 
              prose: Tailwind Typography プラグインのクラス。
              Markdown から変換された HTML に美しいスタイル（見出し、リスト、リンクなど）を自動で適用します。
            */}
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
