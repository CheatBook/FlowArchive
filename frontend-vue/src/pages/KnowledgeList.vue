<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { Edit, Trash2, Plus, BookOpen, Clock, ChevronRight, Loader2, ChevronLeft } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import type { Knowledge, PageResponse } from '@/types';

// ナレッジの一覧とページネーションを表示するトップページコンポーネント
const API_URL = 'http://localhost:8080/api/knowledge';
const { t } = useI18n();
const router = useRouter();
const queryClient = useQueryClient();

// 現在のページ番号（0始まり）を保持するリアクティブ状態
const page = ref(0);

// 指定ページのナレッジ一覧を取得するAPI呼び出し関数
const fetchKnowledges = async (p: number): Promise<PageResponse<Knowledge>> => {
  const response = await axios.get(`${API_URL}?page=${p}&size=6&sort=createdAt,desc`);
  return response.data;
};

// Vue Query を用いて一覧データを取得し、ローディングやキャッシュを管理する処理
const { data, isLoading, isError, isPlaceholderData } = useQuery({
  queryKey: ['knowledges', page],
  queryFn: () => fetchKnowledges(page.value),
  placeholderData: (prev) => prev,
});

// クエリ結果から表示用の配列と総ページ数を算出する算出プロパティ
const knowledges = computed(() => data.value?.content || []);
const totalPages = computed(() => data.value?.totalPages || 0);

// 削除処理を行うミューテーション定義であり、成功時に一覧キャッシュを無効化する設定
const deleteMutation = useMutation({
  mutationFn: async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['knowledges'] });
  },
});

// カード内の削除ボタン押下時にイベント伝播を止めつつ削除確認を行うハンドラ関数
const handleDelete = (e: MouseEvent, id: number) => {
  e.stopPropagation();
  if (!window.confirm(t('common.confirm_delete'))) return;
  deleteMutation.mutate(id);
};

// 編集ボタン押下時にカードクリックと競合しないよう伝播を止めつつ編集画面へ遷移するハンドラ関数
const handleEdit = (e: MouseEvent, id: number) => {
  e.stopPropagation();
  router.push(`/edit/${id}`);
};

// Markdownの装飾を簡易的に除去しつつ、指定文字数でサマリを生成するユーティリティ関数
const getExcerpt = (text: string, maxLength: number = 150) => {
  const plainText = text.replace(/[#*`[\]()]/g, '');
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength) + '...';
};

// ページ番号を更新して再フェッチをトリガーするための関数
const setPage = (p: number) => {
  page.value = p;
};
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <!-- ページ上部のヘッダーエリア -->
    <div class="flex items-center justify-between mb-10 px-2">
      <h2 class="text-3xl font-black text-[#0d3b3b] flex items-center gap-3">
        <span class="p-2 bg-[#1a7a7a] rounded-xl text-white shadow-lg shadow-teal-200">
          <BookOpen :size="28" />
        </span>
        {{ t('knowledge.list_title') }}
      </h2>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-teal-100 shadow-sm">
          <span class="w-2 h-2 bg-[#1a7a7a] rounded-full animate-pulse"></span>
          <span class="text-[#1a7a7a] text-sm font-black">
            {{ data?.totalElements || 0 }} <span class="text-xs font-bold text-[#4a6b6b]">{{ t('knowledge.items_count') }}</span>
          </span>
        </div>
        
        <button
          @click="router.push('/new')"
          class="flex items-center gap-2 px-6 py-2.5 bg-[#1a7a7a] hover:bg-[#0d3b3b] text-white rounded-xl font-bold transition-all shadow-lg shadow-teal-100 active:scale-95"
        >
          <Plus :size="20" /> {{ t('sidebar.new_create') }}
        </button>
      </div>
    </div>

    <!-- 読み込み中・エラー時の表示 -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-32 text-[#1a7a7a]">
      <Loader2 :size="48" class="animate-spin mb-4" />
      <p class="font-bold">{{ t('common.loading') }}</p>
    </div>
    
    <div v-else-if="isError" class="text-center py-32 bg-rose-50 rounded-[3rem] border-2 border-rose-100">
      <p class="text-rose-600 font-bold text-xl">データの取得に失敗しました。</p>
    </div>
    
    <div v-else-if="knowledges.length === 0" class="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-teal-50">
      <div class="text-7xl mb-6 opacity-20">🍃</div>
      <p class="text-[#4a6b6b] font-bold text-2xl">{{ t('knowledge.no_items') }}</p>
      <p class="text-slate-400 text-lg mt-3 font-medium">{{ t('knowledge.no_items_desc') }}</p>
      <button
        @click="router.push('/new')"
        class="mt-8 px-8 py-3 bg-teal-50 text-[#1a7a7a] rounded-2xl font-black hover:bg-teal-100 transition-all"
      >
        {{ t('knowledge.first_create') }}
      </button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div 
        v-for="k in knowledges" 
        :key="k.id" 
        @click="router.push(`/knowledge/${k.id}`)"
        class="group bg-white rounded-[2.5rem] p-8 shadow-xl shadow-teal-900/5 border border-teal-50 hover:border-[#1a7a7a]/20 hover:shadow-2xl hover:shadow-teal-900/10 transition-all duration-500 flex flex-col relative overflow-hidden cursor-pointer"
      >
        <div class="absolute top-0 right-0 w-40 h-40 bg-teal-50/30 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
        
        <div class="flex-grow relative z-10">
          <h3 class="text-2xl font-black text-[#0d3b3b] mb-4 group-hover:text-[#1a7a7a] transition-colors line-clamp-2 leading-tight">
            {{ k.title }}
          </h3>
          <p class="text-[#4a6b6b] leading-relaxed mb-6 line-clamp-3 font-medium text-sm">
            {{ getExcerpt(k.content) }}
          </p>
          <div class="flex items-center gap-1 text-[#1a7a7a] font-bold text-sm mb-8 group-hover:gap-2 transition-all">
            {{ t('knowledge.view_detail') }} <ChevronRight :size="16" />
          </div>
        </div>
        
        <div class="mt-auto pt-6 border-t border-teal-50 relative z-10 flex items-center justify-between">
          <div class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <Clock :size="12" />
            {{ k.createdAt ? new Date(k.createdAt).toLocaleDateString('ja-JP') : '-' }}
          </div>
          
          <div class="flex gap-2">
            <button
              @click="handleEdit($event, k.id!)"
              class="p-2.5 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all"
              :title="t('common.edit')"
            >
              <Edit :size="16" />
            </button>
            <button
              @click="handleDelete($event, k.id!)"
              class="p-2.5 rounded-xl bg-rose-50 text-red-600 hover:bg-rose-100 transition-all"
              :title="t('common.delete')"
            >
              <Trash2 :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ページネーション UI -->
    <div v-if="totalPages > 1" class="mt-16 flex items-center justify-center gap-4">
      <button
        @click="setPage(Math.max(page - 1, 0))"
        :disabled="page === 0"
        class="p-4 rounded-2xl bg-white border border-teal-50 text-[#1a7a7a] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 transition-all shadow-sm"
      >
        <ChevronLeft :size="24" />
      </button>
      
      <div class="flex items-center gap-2">
        <button
          v-for="i in totalPages"
          :key="i"
          @click="setPage(i - 1)"
          :class="[
            'w-12 h-12 rounded-2xl font-black transition-all',
            page === i - 1
              ? 'bg-[#1a7a7a] text-white shadow-lg shadow-teal-200'
              : 'bg-white text-[#4a6b6b] hover:bg-teal-50 border border-teal-50'
          ]"
        >
          {{ i }}
        </button>
      </div>

      <button
        @click="setPage(page + 1)"
        :disabled="isPlaceholderData || page >= totalPages - 1"
        class="p-4 rounded-2xl bg-white border border-teal-50 text-[#1a7a7a] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-teal-50 transition-all shadow-sm"
      >
        <ChevronRight :size="24" />
      </button>
    </div>
  </div>
</template>
