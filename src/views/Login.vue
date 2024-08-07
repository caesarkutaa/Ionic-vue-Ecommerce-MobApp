<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="8" size-lg="6">
            <form @submit.prevent="login">
              <ion-item>
                <ion-label position="floating"></ion-label>
                <ion-input v-model="email" type="email" placeholder="Enter your email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating"></ion-label>
                <ion-input v-model="password" type="password" placeholder="Enter your password"></ion-input>
              </ion-item>
              <ion-button expand="full" type="submit">Login</ion-button>
              <ion-button expand="block" @click="goToHome">Go back home</ion-button>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = () => {
  // Add your login logic here
  console.log('Email:', email.value);
  console.log('Password:', password.value);
};

const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
/* No custom styles */
</style>
