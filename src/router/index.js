// @ts-nocheck
import { createRouter, createWebHistory } from '@ionic/vue-router';
import MainLayout from '@/views/MainLayout.vue'; // Import the MainLayout component
import HomePage from '@/views/HomePage.vue';
import ProductsPage from '@/views/ProductPage.vue';
import CartPage from '@/views/CartPage.vue';
import LoginPage from '@/views/Login.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ProfilePage from '@/views/Profile.vue';
import CategoryPage from '@/views/CategoryPage.vue'
import PaymentPage from '@/views/PaymentPage.vue'

const routes = [
  {
    path: '/',
    component: MainLayout, // Wrap the following pages with MainLayout
    children: [
      {
        path: '',
        component: HomePage,
        name: 'home'
      },
      {
        path: 'products',
        component: ProductsPage,
        name: 'products'
      },
      {
        path: 'cart',
        component: CartPage,
        name: 'cart'
      },
      {
        path: 'profile',
        component: ProfilePage,
        name: 'profile'
      },
      {
        path: 'category',
        component: CategoryPage, 
        name: 'category'
      },
      {
        path: 'login',
        component: LoginPage,
        name: 'login'
      },
      {
        path: 'payment',
        component: PaymentPage, 
        name: 'payment'
      },
    ]
  },
  {
    path: '/register',
    component: RegisterPage
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
