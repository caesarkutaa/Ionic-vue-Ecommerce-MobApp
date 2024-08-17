<template>
  <ion-page class="profile-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-grid class="profile-container">
        <ion-row class="ion-justify-content-center">
          <ion-col size="12" size-md="8" size-lg="6" class="profile-content">
            <div v-if="profile">
              <ion-item>
                <ion-label>First Name:</ion-label>
                <ion-text>{{ profile.firstname }}</ion-text>
              </ion-item>
              <ion-item>
                <ion-label>Last Name:</ion-label>
                <ion-text>{{ profile.lastname }}</ion-text>
              </ion-item>
              <ion-item>
                <ion-label>Email:</ion-label>
                <ion-text>{{ profile.email }}</ion-text>
              </ion-item>
              <ion-button expand="block" @click="logout">Logout</ion-button>
            </div>
            <div v-else>
              <ion-text>Loading...</ion-text>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authstores'; // Ensure correct path
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
  IonText,
  IonButton,
} from '@ionic/vue';

const router = useRouter();
const authStore = useAuthStore(); // Access the Pinia store
const profile = ref(null);

const fetchProfile = async () => {
  try {
    if (!authStore.token || !authStore.userId) {
      throw new Error('User is not authenticated or user ID is missing');
    }

    await authStore.fetchUserDetails(); // Fetch user details from Pinia store
    profile.value = authStore.user; // Update local profile with store data
    console.log('Profile:', profile.value); // Log profile data
  } catch (error) {
    console.error('Error fetching profile:', error);
    alert('Failed to fetch profile');
  }
};

const logout = () => {
  authStore.logout(); // Clear authentication state in Pinia
  router.push('/'); // Redirect to the home page
};


onMounted(() => {
  console.log('Component mounted. Auth store state:', authStore);
  if (authStore.userId) { // Ensure user ID is available
    fetchProfile();
  } else {
    console.error('No user ID found, redirecting to login.');
    router.push('/login'); // Redirect to login if not authenticated
  }
});
</script>

<style scoped>
.profile-page {
  --background: linear-gradient(to bottom right, #74ebd5, #acb6e5);
}

.profile-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-content {
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
