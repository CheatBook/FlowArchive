# KnowledgeList.tsx 超詳細解説

ナレッジの一覧をサーバーから取得し、カード形式で並べて表示する画面です。

```tsx
// 必要なフックやアイコン、型定義を読み込みます
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
// ...省略...

/**
 * サーバーからデータを取得する関数
 * @param page 取得したいページ番号
 */
const fetchKnowledges = async (page: number): Promise<PageResponse<Knowledge>> => {
  // APIにページ番号と1ページあたりの件数（size=6）を伝えてデータを要求します
  const response = await fetch(`${API_URL}?page=${page}&size=6&sort=createdAt,desc`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const KnowledgeList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // 現在のページ番号を管理する State（0から開始）
  const [page, setPage] = useState(0);

  /**
   * 【データ取得：useQuery】
   * queryKey に page を含めることで、ページ番号が変わるたびに自動で fetchKnowledges が実行されます。
   */
  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: ['knowledges', page],
    queryFn: () => fetchKnowledges(page),
    placeholderData: keepPreviousData, // 次のページを読み込んでいる間も前のデータを表示し続ける（ガタつき防止）
  });

  // 取得したデータから記事リストと総ページ数を取り出します
  const knowledges = data?.content || [];
  const totalPages = data?.totalPages || 0;

  /**
   * 【データ削除：useMutation】
   */
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      // 削除に成功したらキャッシュを無効化し、一覧を再取得させます
      queryClient.invalidateQueries({ queryKey: ['knowledges'] });
    },
  });

  // ...JSX部分（map関数でカードを並べる処理など）...
};
```
