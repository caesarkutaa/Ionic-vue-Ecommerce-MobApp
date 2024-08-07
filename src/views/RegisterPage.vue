<template>
  <ion-page class="register-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Register</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="register-container">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="8" size-lg="6" class="register-content">
            <form @submit.prevent="register">
              <ion-item>
                <ion-label position="floating"></ion-label>
                <ion-input
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating"></ion-label>
                <ion-input
                  v-model="password"
                  type="password"
                  placeholder="Enter your password"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating"></ion-label>
                <ion-input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                ></ion-input>
              </ion-item>
              <ion-button expand="block" type="submit">Register</ion-button>
              <ion-button expand="block" @click="goToLogin">Already have an account? Login</ion-button>
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
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from '@ionic/vue';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const register = () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  // Add your registration logic here
  console.log('Email:', email.value);
  console.log('Password:', password.value);
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.register-page {
  --background: linear-gradient(to bottom right, #ff758c, #ff7eb3);
}

.register-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

ion-item {
  --min-height: 50px;
  margin-bottom: 16px;
}

ion-button {
  margin-top: 20px;
}
</style>
