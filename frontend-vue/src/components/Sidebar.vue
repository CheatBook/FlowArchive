<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { LayoutDashboard, PlusCircle, Database, Github, Info } from 'lucide-vue-next';
import { useI18n } from 'vue-i18n';

// アプリ全体で共通利用するナビゲーションサイドバーコンポーネント
const { t } = useI18n();
const route = useRoute();
// 現在のパスと比較してメニューのアクティブ状態を判定するヘルパー関数
const isActive = (path: string) => route.path === path;
</script>

<template>
  <aside class="w-72 bg-[#0d3b3b] text-white flex flex-col sticky top-0 h-screen shadow-2xl z-20">
    <!-- ロゴとアプリ名エリア -->
    <div class="p-8">
      <div class="flex items-center gap-4 mb-10">
        <div class="relative">
          <!-- ロゴ画像 -->
          <img src="/logo.png" alt="Flow Archive Logo" class="w-12 h-12 object-contain relative z-10" />
          <!-- ロゴの後ろの光るエフェクト -->
          <div class="absolute inset-0 bg-teal-400 blur-xl opacity-20 animate-pulse"></div>
        </div>
        <div>
          <h1 class="text-xl font-black tracking-tighter leading-none">
            FLOW<br /><span class="text-teal-400">ARCHIVE</span>
          </h1>
        </div>
      </div>

      <!-- ナビゲーションリンク -->
      <nav class="space-y-3">
        <RouterLink
          to="/"
          :class="[
            'flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all',
            isActive('/') 
              ? 'bg-teal-400 text-[#0d3b3b] shadow-lg shadow-teal-400/20 scale-[1.02]' 
              : 'text-teal-100/60 hover:bg-white/5 hover:text-white'
          ]"
        >
          <LayoutDashboard :size="20" />
          {{ t('sidebar.dashboard') }}
        </RouterLink>

        <RouterLink
          to="/new"
          :class="[
            'flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all',
            isActive('/new') 
              ? 'bg-teal-400 text-[#0d3b3b] shadow-lg shadow-teal-400/20 scale-[1.02]' 
              : 'text-teal-100/60 hover:bg-white/5 hover:text-white'
          ]"
        >
          <PlusCircle :size="20" />
          {{ t('sidebar.new_create') }}
        </RouterLink>
      </nav>
    </div>

    <!-- サイドバー下部のシステム情報エリア -->
    <div class="mt-auto p-6">
      <div class="bg-white/5 rounded-[2rem] p-6 border border-white/10">
        <div class="flex items-center gap-2 text-teal-400 mb-4">
          <Database :size="16" />
          <span class="text-[10px] font-black uppercase tracking-[0.2em]">{{ t('common.system_status') }}</span>
        </div>
        
        <div class="space-y-4">
          <!-- DB 接続情報のダミー表示 -->
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-teal-100/40 uppercase">{{ t('common.connected') }}</span>
            <span class="text-[10px] font-black text-teal-400">CONNECTED</span>
          </div>
          <!-- バージョン情報のダミー表示 -->
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-bold text-teal-100/40 uppercase">{{ t('common.version') }}</span>
            <span class="text-[10px] font-black text-white">v1.0.4-STABLE</span>
          </div>
        </div>
        
        <!-- 外部リンクなどのアイコン -->
        <div class="flex gap-3 mt-6 pt-6 border-t border-white/5">
          <button class="p-2 rounded-lg bg-white/5 text-teal-100/40 hover:text-white transition-colors">
            <Github :size="16" />
          </button>
          <button class="p-2 rounded-lg bg-white/5 text-teal-100/40 hover:text-white transition-colors">
            <Info :size="16" />
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>
