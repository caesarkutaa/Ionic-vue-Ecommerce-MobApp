<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button v-if="isLoggedIn" @click="goToProfile" class="user-name-button">
            {{ userFirstName }}
          </ion-button>
          <ion-button v-else href="/login">
            <ion-icon name="person-circle-outline" class="dark-icon"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>

    <router-view></router-view> <!-- This will render HomePage, ProductsPage, etc. -->

    <ion-footer>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/">
          <ion-icon name="home-outline"></ion-icon> <!-- Updated to home logo -->
          <ion-label>Home</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="category" href="/category">
          <ion-icon name="list-outline"></ion-icon> <!-- Updated to category icon -->
          <ion-label>Categories</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="cart" href="/cart">
          <ion-icon name="cart-outline"></ion-icon>
          <ion-label>Cart</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-footer>
  </ion-page>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authstores';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonTabBar,
  IonTabButton,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet
} from '@ionic/vue';

const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() => !!authStore.token);
const userFirstName = computed(() => authStore.user ? authStore.user.firstname : '');

const goToProfile = () => {
  router.push('/profile');
};
</script>

<style scoped>
ion-header {
  --background: black;
  --color: white;
}

ion-title {
  font-size: 24px;
}

ion-button {
  --color: black;
}

.dark-icon {
  color: black;
}

.user-name-button {
  font-weight: bold;
  font-size: 18px;
  --color: black;
}

ion-footer {
  --background: #f8f8f8;
  
}

ion-tab-bar {
  --color: black;
  --color-selected: #3880ff;
}

ion-tab-button {
  --color: black;
  --color-selected: #3880ff;
}

ion-tab-button ion-label {
  font-size: 12px;
}
</style>
