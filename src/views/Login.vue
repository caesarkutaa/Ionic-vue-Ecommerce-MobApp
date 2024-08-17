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
              <ion-item :class="{ 'has-error': emailError }">
                <ion-label position="floating"></ion-label>
                <ion-input v-model="email" type="email" placeholder="Enter your email"></ion-input>
              </ion-item>
              <div v-if="emailError" class="error-message">{{ emailError }}</div>

              <ion-item :class="{ 'has-error': passwordError }">
                <ion-label position="floating"></ion-label>
                <ion-input v-model="password" type="password" placeholder="Enter your password"></ion-input>
              </ion-item>
              <div v-if="passwordError" class="error-message">{{ passwordError }}</div>

              <ion-button expand="full" type="submit" class="login-button">Login</ion-button>
              <ion-button expand="block" @click="goToRegister" class="home-button">Create a new account</ion-button>
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
const emailError = ref('');
const passwordError = ref('');
const router = useRouter();
const authStore = useAuthStore(); // Access the Pinia store

const login = async () => {
  emailError.value = '';
  passwordError.value = '';

  if (!email.value) {
    emailError.value = 'Email is required';
  }

  if (!password.value) {
    passwordError.value = 'Password is required';
  }

  if (emailError.value || passwordError.value) {
    return;
  }

  try {
    const response = await authStore.login(email.value, password.value); // Call the login action in Pinia

    if (response.status === 201) {
      console.log('Login successful:', response.data);
      // Redirect to the home page or another page after successful login
      router.push('/');
    } else {
      // Handle login failure
      console.error('Login failed:', response.data);
      alert(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred during login. Please try again later.');
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.error-message {
  color: red;
}
.has-error ion-input {
  border: 1px solid red;
}
</style>
