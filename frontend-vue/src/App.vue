<script setup lang="ts">
// アプリ全体のレイアウトを定義するルートコンポーネント
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <!-- サイドバーとメインコンテンツを横並びに配置するルートレイアウト -->
  <div class="flex min-h-screen bg-[#f0f4f4]">
    <Sidebar />

    <!-- 画面ごとに切り替わるメインコンテンツ領域である -->
    <!-- 画面ごとに切り替わるメインコンテンツ領域 -->
    <main class="flex-1 p-8 lg:p-12 overflow-y-auto">
      <div class="animate-in fade-in duration-500">
        <router-view />
      </div>
      
      <footer class="mt-20 text-center text-slate-400 text-[10px] font-black tracking-[0.4em] uppercase">
        &copy; 2026 Flow Archive Project / Knowledge Management System
      </footer>
    </main>
  </div>
</template>
