import { createRouter, createWebHistory } from 'vue-router';
import NotesList from '@/views/NotesList.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: NotesList,
    },
    {
      path: '/note',
      name: 'note',
      component: () => import('@/views/NoteForm.vue'),
    },
  ],
});

export default router;
