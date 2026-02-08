# KnowledgeDetail.tsx 超詳細解説

特定のナレッジを1件だけ詳しく表示する画面です。

```tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MarkdownRenderer from '../components/MarkdownRenderer';
// ...省略...

/**
 * サーバーから特定の1件を取得する関数
 */
const fetchKnowledge = async (id: string): Promise<Knowledge> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error('Knowledge not found');
  return response.json();
};

const KnowledgeDetail: React.FC = () => {
  const { t } = useTranslation();
  // URL（/knowledge/5）から ID（5）を抜き取ります
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  /**
   * 【データ取得：useQuery】
   * enabled: !!id とすることで、IDが存在する時だけ通信を行うようにします。
   */
  const { data: knowledge, isLoading, isError } = useQuery({
    queryKey: ['knowledge', id],
    queryFn: () => fetchKnowledge(id!),
    enabled: !!id,
  });

  // 読み込み中やエラー時の表示制御
  if (isLoading) return <LoaderArea />;
  if (isError || !knowledge) return <ErrorArea />;

  return (
    <div className="max-w-4xl mx-auto">
      {/* 戻るボタン */}
      <button onClick={() => navigate('/')}>一覧に戻る</button>

      <article className="bg-white rounded-[3rem] shadow-xl">
        <header className="p-10 bg-[#f9fbfb]">
          <h1 className="text-4xl font-black">{knowledge.title}</h1>
          {/* 日付表示など */}
        </header>

        <div className="p-10">
          {/* MarkdownRenderer を使って本文を表示 */}
          <div className="prose prose-teal max-w-none">
            <MarkdownRenderer content={knowledge.content} />
          </div>
        </div>
      </article>
    </div>
  );
};
```
