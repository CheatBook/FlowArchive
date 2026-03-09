<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import { ArrowLeft, Edit, Clock, Calendar, Loader2 } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useQuery } from '@tanstack/vue-query';
import axios from 'axios';
import type { Knowledge } from '@/types';

// 単一のナレッジ詳細を表示するページコンポーネント
const API_URL = 'http://localhost:8080/api/knowledge';
const { t } = useI18n();
const router = useRouter();
const route = useRoute();

// ルートパラメータから対象ナレッジIDを取得する処理
const id = route.params.id as string;

// 指定IDのナレッジをAPIから取得する非同期関数
const fetchKnowledge = async (knowledgeId: string): Promise<Knowledge> => {
  const response = await axios.get(`${API_URL}/${knowledgeId}`);
  return response.data;
};

// Vue Query を用いてナレッジ詳細をフェッチしつつ、ロード状態とエラー状態を管理する処理
const { data: knowledge, isLoading, isError } = useQuery({
  queryKey: ['knowledge', id],
  queryFn: () => fetchKnowledge(id),
  enabled: !!id,
});

// 一覧画面へ戻るためのナビゲーションハンドラ関数
const goBack = () => {
  router.push('/');
};

// 編集画面へ遷移するためのナビゲーションハンドラ関数
const goToEdit = () => {
  if (knowledge.value?.id) {
    router.push(`/edit/${knowledge.value.id}`);
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <!-- 戻るボタン -->
    <button
      @click="goBack"
      class="group flex items-center gap-2 text-[#1a7a7a] font-bold mb-8 hover:text-[#0d3b3b] transition-colors"
    >
      <ArrowLeft :size="20" class="group-hover:-translate-x-1 transition-transform" />
      {{ t('common.back_to_list') }}
    </button>

    <!-- 読み込み中の表示 -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-32 text-[#1a7a7a]">
      <Loader2 :size="48" class="animate-spin mb-4" />
      <p class="font-bold">{{ t('common.loading') }}</p>
    </div>

    <!-- エラー時、またはデータが見つからない場合 -->
    <div v-else-if="isError || !knowledge" class="text-center py-32">
      <p class="text-rose-600 font-bold text-xl">ナレッジが見つかりませんでした。</p>
      <button @click="goBack" class="mt-4 text-[#1a7a7a] font-bold">
        一覧に戻る
      </button>
    </div>

    <article v-else class="bg-white rounded-[3rem] shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden">
      <!-- 記事のヘッダー部分 -->
      <header class="px-10 py-12 border-b border-teal-50 bg-[#f9fbfb]">
        <h1 class="text-4xl font-black text-[#0d3b3b] mb-6 leading-tight">
          {{ knowledge.title }}
        </h1>
        
        <!-- 日付などのメタ情報 -->
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Calendar :size="14" class="text-[#1a7a7a]" />
            {{ t('knowledge.created_at') }}: {{ knowledge.createdAt ? new Date(knowledge.createdAt).toLocaleDateString('ja-JP') : '-' }}
          </div>
          <div v-if="knowledge.updatedAt" class="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
            <Clock :size="14" class="text-amber-500" />
            {{ t('knowledge.updated_at') }}: {{ new Date(knowledge.updatedAt).toLocaleDateString('ja-JP') }}
          </div>
        </div>
      </header>

      <!-- 記事の本文部分：Markdown 形式で表示 -->
      <div class="px-10 py-12">
        <div class="prose prose-teal prose-lg max-w-none">
          <MarkdownRenderer :content="knowledge.content" />
        </div>
      </div>

      <!-- 記事下部の編集ボタン -->
      <footer class="px-10 py-8 bg-teal-50/50 border-t border-teal-50 flex justify-end">
        <button
          @click="goToEdit"
          class="flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#1a7a7a] text-[#1a7a7a] rounded-2xl font-black hover:bg-[#1a7a7a] hover:text-white transition-all shadow-lg shadow-teal-900/5 active:scale-95"
        >
          <Edit :size="20" />
          {{ t('knowledge.edit_this') }}
        </button>
      </footer>
    </article>
  </div>
</template>
