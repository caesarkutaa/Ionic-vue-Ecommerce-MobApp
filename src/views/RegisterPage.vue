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
                <ion-label position="floating">First Name</ion-label>
                <ion-input v-model="firstName" type="text" placeholder="Enter your first name" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Last Name</ion-label>
                <ion-input v-model="lastName" type="text" placeholder="Enter your last name" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input v-model="email" type="email" placeholder="Enter your email" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Password</ion-label>
                <ion-input v-model="password" type="password" placeholder="Enter your password" required></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Confirm Password</ion-label>
                <ion-input v-model="confirmPassword" type="password" placeholder="Confirm your password" required></ion-input>
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
import { useAuthStore } from '../stores/authstores'; // Import the Pinia store
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

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const authStore = useAuthStore(); // Access the Pinia store

const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }

  const success = await authStore.register({
    firstname: firstName.value,
    lastname: lastName.value,
    email: email.value,
    password: password.value,
  });

  if (success) {
    router.push('/login'); // Redirect to login page after successful registration
  } else {
    alert('Registration failed. Please try again.');
  }
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
