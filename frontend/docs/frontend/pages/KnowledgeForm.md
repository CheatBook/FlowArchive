# KnowledgeForm.tsx 超詳細解説

ナレッジの「新規作成」と「編集」の両方を担当する画面です。

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// ...省略...

const KnowledgeForm: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>(); // URLにIDがあれば「編集モード」
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // フォームの入力内容を管理する State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false); // エディタとプレビューの切り替え

  /**
   * 【データ取得：useQuery】
   * 編集モード（IDあり）の時だけ、既存のデータをサーバーから取ってきます。
   */
  const { data: existingKnowledge, isLoading: isFetching } = useQuery({
    queryKey: ['knowledge', id],
    queryFn: () => fetchKnowledge(id!),
    enabled: !!id,
  });

  /**
   * 【初期値のセット：useEffect】
   * データの取得が終わったら、入力欄（title, content）に値をセットします。
   */
  useEffect(() => {
    if (existingKnowledge) {
      setTitle(existingKnowledge.title);
      setContent(existingKnowledge.content);
    }
  }, [existingKnowledge]);

  /**
   * 【保存処理：useMutation】
   * 成功時にキャッシュをクリアし、一覧画面へ戻ります。
   */
  const mutation = useMutation({
    mutationFn: (data: Knowledge) => saveKnowledge({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledges'] });
      if (id) queryClient.invalidateQueries({ queryKey: ['knowledge', id] });
      navigate('/');
    },
  });

  // フォーム送信時の処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content });
  };

  // ...JSX部分（入力欄やプレビュー切り替えスイッチ）...
};
```
