import { createRouter, createWebHistory } from 'vue-router'

const user = localStorage.getItem('user') || null

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
      alias: ['/home', '/main']
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
      redirect: user ? '' : '/auth/login'
    },
    {
      path: '/auth/login',
      name: 'login',
      component: () => import('../views/auth/Login.vue')
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/auth/Register.vue')
    },
  ]
})

export default router
