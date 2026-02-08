import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Save, Eye, Edit3, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Knowledge } from '../types/index';

const API_URL = 'http://localhost:8080/api/knowledge';

/**
 * 【KnowledgeForm コンポーネント】
 * 
 * ナレッジの「新規作成」と「編集」の両方を担当する画面です。
 */
const KnowledgeForm: React.FC = () => {
  const { t } = useTranslation();
  /**
   * [URL パラメータの取得：useParams]
   * /edit/5 にアクセスした場合、id に "5" が入ります。
   * /new にアクセスした場合は id は undefined になります。
   */
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // フォームに入力された値を保存する State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // 「エディタ」と「プレビュー」のどちらを表示しているかの State
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // 保存ボタンの連打防止などのためのローディング状態
  const [loading, setLoading] = useState(false);

  /**
   * 編集モードの時だけ、既存のデータをサーバーから取ってくる
   */
  useEffect(() => {
    if (id) {
      fetchKnowledge(id);
    }
  }, [id]); // id が変わるたびに（＝別の記事の編集画面に行くたびに）実行

  const fetchKnowledge = async (knowledgeId: string) => {
    try {
      const response = await fetch(`${API_URL}/${knowledgeId}`);
      if (response.ok) {
        const data = await response.json();
        // 取得したデータを入力欄にセットする
        setTitle(data.title);
        setContent(data.content);
      }
    } catch (error) {
      console.error('データの取得に失敗しました:', error);
    }
  };

  /**
   * 保存ボタン（作成・更新）が押された時の処理
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // フォーム送信によるページリロードを止める
    setLoading(true);
    
    const knowledge: Knowledge = { title, content };

    try {
      // id があれば PUT（更新）、なければ POST（新規作成）
      const url = id ? `${API_URL}/${id}` : API_URL;
      const method = id ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(knowledge),
      });

      if (response.ok) {
        // 保存に成功したら一覧画面（ダッシュボード）に戻る
        navigate('/');
      }
    } catch (error) {
      console.error('保存に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <section className="bg-white rounded-3xl shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden">
        <div className="p-8 sm:p-10">
          
          {/* 画面上部のタイトルと切り替えスイッチ */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0d3b3b] flex items-center gap-3">
              <span className={`w-2 h-8 rounded-full ${id ? 'bg-amber-400' : 'bg-[#1a7a7a]'}`}></span>
              {id ? t('knowledge.edit_title') : t('knowledge.new_title')}
            </h2>
            
            {/* エディタ / プレビュー の切り替えタブ */}
            <div className="flex bg-teal-50 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setIsPreviewMode(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${!isPreviewMode ? 'bg-white text-[#1a7a7a] shadow-sm' : 'text-[#4a6b6b] hover:text-[#1a7a7a]'}`}
              >
                <Edit3 size={16} /> {t('knowledge.editor')}
              </button>
              <button
                type="button"
                onClick={() => setIsPreviewMode(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${isPreviewMode ? 'bg-white text-[#1a7a7a] shadow-sm' : 'text-[#4a6b6b] hover:text-[#1a7a7a]'}`}
              >
                <Eye size={16} /> {t('knowledge.preview')}
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* タイトル入力 */}
            <div>
              <label className="block text-sm font-bold text-[#2c4a4a] mb-2 ml-1">{t('knowledge.title_label')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder={t('knowledge.title_placeholder')}
                className="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-[#f9fbfb] focus:bg-white focus:ring-4 focus:ring-[#1a7a7a]/10 focus:border-[#1a7a7a] transition-all outline-none placeholder:text-slate-400 text-[#0d3b3b] font-medium"
              />
            </div>

            {/* 本文入力 または プレビュー表示 */}
            <div>
              <label className="block text-sm font-bold text-[#2c4a4a] mb-2 ml-1">{t('knowledge.content_label')}</label>
              {isPreviewMode ? (
                /* プレビュー表示エリア：MarkdownRenderer コンポーネントを使用 */
                <div className="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-white min-h-[400px] prose prose-teal max-w-none overflow-auto">
                  <MarkdownRenderer content={content || t('knowledge.no_preview')} />
                </div>
              ) : (
                /* エディタエリア：標準の textarea を使用 */
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder={t('knowledge.content_placeholder')}
                  rows={15}
                  className="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-[#f9fbfb] focus:bg-white focus:ring-4 focus:ring-[#1a7a7a]/10 focus:border-[#1a7a7a] transition-all outline-none placeholder:text-slate-400 text-[#0d3b3b] font-mono text-sm resize-none"
                />
              )}
            </div>

            {/* 下部のボタンエリア */}
            <div className="flex gap-4 pt-2">
              {/* 保存ボタン */}
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black text-white transition-all transform active:scale-[0.98] shadow-xl disabled:opacity-50 ${
                  id 
                    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' 
                    : 'bg-[#1a7a7a] hover:bg-[#0d3b3b] shadow-teal-200'
                }`}
              >
                <Save size={20} />
                {loading ? t('common.loading') : id ? t('common.save') : t('sidebar.new_create')}
              </button>
              
              {/* キャンセルボタン：一覧に戻る */}
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 py-4 rounded-2xl font-bold text-[#4a6b6b] bg-teal-50 hover:bg-teal-100 transition-all flex items-center gap-2"
              >
                <X size={20} /> {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeForm;
