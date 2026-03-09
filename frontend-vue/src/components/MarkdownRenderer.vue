<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';

// Markdown文字列をHTMLとして描画するための薄いラッパーコンポーネント
defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="prose prose-teal max-w-none">
    <VueMarkdown :source="content" />
  </div>
</template>

<style>
/* 
  Tailwind Typography (prose) のデフォルトスタイルを、
  コードブロック中心に読みやすく調整したカスタマイズ
*/
.prose pre {
  background-color: #1e1e1e !important;
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.prose code {
  color: #1a7a7a;
  background-color: #f0fdfa;
  padding: 0.2rem 0.4rem;
  border-radius: 0.25rem;
  font-weight: 600;
}

.prose pre code {
  color: #d4d4d4;
  background-color: transparent;
  padding: 0;
}
</style>
