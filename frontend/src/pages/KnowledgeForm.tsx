import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { Save, Eye, Edit3, X, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
 * ナレッジを保存（作成・更新）する関数
 */
const saveKnowledge = async ({ id, data }: { id?: string, data: Knowledge }): Promise<Knowledge> => {
  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? 'PUT' : 'POST';
  
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error('Failed to save');
  return response.json();
};

/**
 * 【KnowledgeForm コンポーネント】
 * 
 * TanStack Query の Mutation を使って保存処理を管理します。
 */
const KnowledgeForm: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  /**
   * [データ取得：useQuery]
   * 編集モードの場合、既存データを取得してフォームにセットします。
   */
  const { data: existingKnowledge, isLoading: isFetching } = useQuery({
    queryKey: ['knowledge', id],
    queryFn: () => fetchKnowledge(id!),
    enabled: !!id,
  });

  /**
   * 取得したデータをフォームの状態に反映させる
   */
  useEffect(() => {
    if (existingKnowledge) {
      setTitle(existingKnowledge.title);
      setContent(existingKnowledge.content);
    }
  }, [existingKnowledge]);

  /**
   * [保存処理：useMutation]
   */
  const mutation = useMutation({
    mutationFn: (data: Knowledge) => saveKnowledge({ id, data }),
    onSuccess: () => {
      // 一覧と詳細のキャッシュを無効化して再取得を促す
      queryClient.invalidateQueries({ queryKey: ['knowledges'] });
      if (id) queryClient.invalidateQueries({ queryKey: ['knowledge', id] });
      navigate('/');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content });
  };

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-[#1a7a7a]">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold">{t('common.loading')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <section className="bg-white rounded-3xl shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden">
        <div className="p-8 sm:p-10">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#0d3b3b] flex items-center gap-3">
              <span className={`w-2 h-8 rounded-full ${id ? 'bg-amber-400' : 'bg-[#1a7a7a]'}`}></span>
              {id ? t('knowledge.edit_title') : t('knowledge.new_title')}
            </h2>
            
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

            <div>
              <label className="block text-sm font-bold text-[#2c4a4a] mb-2 ml-1">{t('knowledge.content_label')}</label>
              {isPreviewMode ? (
                <div className="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-white min-h-[400px] prose prose-teal max-w-none overflow-auto">
                  <MarkdownRenderer content={content || t('knowledge.no_preview')} />
                </div>
              ) : (
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

            <div className="flex gap-4 pt-2">
              <button
                type="submit"
                disabled={mutation.isLoading}
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black text-white transition-all transform active:scale-[0.98] shadow-xl disabled:opacity-50 ${
                  id 
                    ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' 
                    : 'bg-[#1a7a7a] hover:bg-[#0d3b3b] shadow-teal-200'
                }`}
              >
                {mutation.isLoading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                {mutation.isLoading ? t('common.loading') : id ? t('common.save') : t('sidebar.new_create')}
              </button>
              
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
