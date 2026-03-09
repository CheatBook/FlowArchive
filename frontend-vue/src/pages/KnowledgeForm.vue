<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import { Save, Eye, Edit3, X, Loader2 } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import axios from 'axios';
import type { Knowledge } from '@/types';

// ナレッジの新規作成および編集を行うフォームページコンポーネント
const API_URL = 'http://localhost:8080/api/knowledge';
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const queryClient = useQueryClient();

// ルートパラメータから編集対象IDを取得し、存在すれば編集モードとみなす処理
const id = route.params.id as string | undefined;
const title = ref('');
const content = ref('');
const isPreviewMode = ref(false);

// 既存ナレッジを取得するAPI呼び出し関数であり、編集時にのみ使用する処理
const fetchKnowledge = async (knowledgeId: string): Promise<Knowledge> => {
  const response = await axios.get(`${API_URL}/${knowledgeId}`);
  return response.data;
};

// 編集モードのときだけ既存データを取得し、フォーム初期値として反映するためのクエリ設定
const { data: existingKnowledge, isLoading: isFetching } = useQuery({
  queryKey: ['knowledge', id],
  queryFn: () => fetchKnowledge(id!),
  enabled: !!id,
});

// 取得済みの既存ナレッジを監視し、値が変化したらタイトルと内容に流し込むwatch処理
watch(existingKnowledge, (newVal) => {
  if (newVal) {
    title.value = newVal.title;
    content.value = newVal.content;
  }
}, { immediate: true });

// 新規作成と更新の両方を1つの関数で扱うための保存API呼び出し処理
const saveKnowledge = async (data: Knowledge): Promise<Knowledge> => {
  const url = id ? `${API_URL}/${id}` : API_URL;
  const method = id ? 'put' : 'post';
  const response = await axios[method](url, data);
  return response.data;
};

// 保存処理のミューテーション定義であり、成功時に関連クエリを無効化して一覧・詳細を更新する設定
const mutation = useMutation({
  mutationFn: saveKnowledge,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['knowledges'] });
    if (id) queryClient.invalidateQueries({ queryKey: ['knowledge', id] });
    router.push('/');
  },
});

// フォーム送信時に現在の入力値をまとめて保存APIへ渡すハンドラ関数
const handleSubmit = () => {
  mutation.mutate({ title: title.value, content: content.value });
};
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <div v-if="isFetching" class="flex flex-col items-center justify-center py-32 text-[#1a7a7a]">
      <Loader2 :size="48" class="animate-spin mb-4" />
      <p class="font-bold">{{ t('common.loading') }}</p>
    </div>

    <section v-else class="bg-white rounded-3xl shadow-2xl shadow-teal-900/5 border border-teal-50 overflow-hidden">
      <div class="p-8 sm:p-10">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-[#0d3b3b] flex items-center gap-3">
            <span :class="['w-2 h-8 rounded-full', id ? 'bg-amber-400' : 'bg-[#1a7a7a]']"></span>
            {{ id ? t('knowledge.edit_title') : t('knowledge.new_title') }}
          </h2>
          
          <div class="flex bg-teal-50 p-1 rounded-xl">
            <button
              type="button"
              @click="isPreviewMode = false"
              :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all', !isPreviewMode ? 'bg-white text-[#1a7a7a] shadow-sm' : 'text-[#4a6b6b] hover:text-[#1a7a7a]']"
            >
              <Edit3 :size="16" /> {{ t('knowledge.editor') }}
            </button>
            <button
              type="button"
              @click="isPreviewMode = true"
              :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all', isPreviewMode ? 'bg-white text-[#1a7a7a] shadow-sm' : 'text-[#4a6b6b] hover:text-[#1a7a7a]']"
            >
              <Eye :size="16" /> {{ t('knowledge.preview') }}
            </button>
          </div>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="block text-sm font-bold text-[#2c4a4a] mb-2 ml-1">{{ t('knowledge.title_label') }}</label>
            <input
              type="text"
              v-model="title"
              required
              :placeholder="t('knowledge.title_placeholder')"
              class="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-[#f9fbfb] focus:bg-white focus:ring-4 focus:ring-[#1a7a7a]/10 focus:border-[#1a7a7a] transition-all outline-none placeholder:text-slate-400 text-[#0d3b3b] font-medium"
            />
          </div>

          <div>
            <label class="block text-sm font-bold text-[#2c4a4a] mb-2 ml-1">{{ t('knowledge.content_label') }}</label>
            <div v-if="isPreviewMode" class="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-white min-h-[400px] prose prose-teal max-w-none overflow-auto">
              <MarkdownRenderer :content="content || t('knowledge.no_preview')" />
            </div>
            <textarea
              v-else
              v-model="content"
              required
              :placeholder="t('knowledge.content_placeholder')"
              rows="15"
              class="w-full px-5 py-4 rounded-2xl border-2 border-teal-50 bg-[#f9fbfb] focus:bg-white focus:ring-4 focus:ring-[#1a7a7a]/10 focus:border-[#1a7a7a] transition-all outline-none placeholder:text-slate-400 text-[#0d3b3b] font-mono text-sm resize-none"
            ></textarea>
          </div>

          <div class="flex gap-4 pt-2">
            <button
              type="submit"
              :disabled="mutation.isPending.value"
              :class="['flex-1 flex items-center justify-center gap-2 py-4 px-8 rounded-2xl font-black text-white transition-all transform active:scale-[0.98] shadow-xl disabled:opacity-50', id ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200' : 'bg-[#1a7a7a] hover:bg-[#0d3b3b] shadow-teal-200']"
            >
              <Loader2 v-if="mutation.isPending.value" :size="20" class="animate-spin" />
              <Save v-else :size="20" />
              {{ mutation.isPending.value ? t('common.loading') : id ? t('common.save') : t('sidebar.new_create') }}
            </button>
            
            <button
              type="button"
              @click="router.push('/')"
              class="px-8 py-4 rounded-2xl font-bold text-[#4a6b6b] bg-teal-50 hover:bg-teal-100 transition-all flex items-center gap-2"
            >
              <X :size="20" /> {{ t('common.cancel') }}
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
