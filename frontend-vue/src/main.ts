import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import router from './router';
import i18n from './locales/i18n';
import './assets/main.css';

// アプリケーションのエントリポイントであり、グローバルなプラグインや設定をまとめて初期化する役割を持つモジュール

const app = createApp(App);

// ルーター・国際化・データフェッチの各プラグインをVueアプリケーションに登録する処理
app.use(router);
app.use(i18n);
app.use(VueQueryPlugin);

app.mount('#app');
