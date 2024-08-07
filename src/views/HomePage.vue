<!-- src/views/HomePage.vue -->
<template>
  <ion-page class="home-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="8" size-lg="6" class="home-content">
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple home page for your Ionic Vue app.</p>
            <ion-button expand="block" @click="goToRegister">Go to Register</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton
} from '@ionic/vue';

// Get the router instance
const router = useRouter();

// Define the function to navigate to the register page
const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.home-page {
  --background: linear-gradient(to bottom right, #4facfe, #00f2fe);
}

.home-content {
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  margin-bottom: 16px;
}

p {
  margin-bottom: 32px;
  color: #666;
}
</style>
