// @ts-nocheck
import { createRouter, createWebHistory } from '@ionic/vue-router';
import LoginPage from '@/views/Login.vue';
import HomePage from '@/views/HomePage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

const routes = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/register',
    component: RegisterPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;





// const routes = [
//   {
//     path: '/',
//     redirect: '/login'
//   },
//   {
//     path: '/login',
//     component: Login
//   },

// ];

// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes
// });

// export default router;
