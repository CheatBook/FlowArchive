import { createRouter, createWebHistory } from 'vue-router';
import KnowledgeList from '@/pages/KnowledgeList.vue';
import KnowledgeForm from '@/pages/KnowledgeForm.vue';
import KnowledgeDetail from '@/pages/KnowledgeDetail.vue';

// 画面遷移のルーティング定義を集約するモジュール
const routes = [
  {
    path: '/',
    name: 'KnowledgeList',
    component: KnowledgeList,
  },
  {
    path: '/new',
    name: 'KnowledgeCreate',
    component: KnowledgeForm,
  },
  {
    path: '/edit/:id',
    name: 'KnowledgeEdit',
    component: KnowledgeForm,
    props: true,
  },
  {
    path: '/knowledge/:id',
    name: 'KnowledgeDetail',
    component: KnowledgeDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
