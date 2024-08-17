<template>
  <ion-page> 
    <ion-content>
      <div class="category-container">
        <div v-if="loading" class="loading">Loading categories...</div>
        <div v-else-if="error" class="error">{{ error }}</div>
        <div v-else>
          <div v-if="!selectedCategory">
            <div v-for="category in categories" :key="category._id" class="category-item" @click="selectCategory(category._id)">
              <h2>{{ category.name }}</h2>
            </div>
          </div>
          <div v-else>
            <h2>{{ selectedCategory.name }}</h2>
            <p>{{ selectedCategory.description }}</p>
            <ion-button @click="clearSelection">Back to Categories</ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useCategoryStore } from '../stores/categoryStores';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonButton
} from '@ionic/vue';

const categoryStore = useCategoryStore();

const loading = computed(() => categoryStore.loading);
const categories = computed(() => categoryStore.categories);
const error = computed(() => categoryStore.error);
const selectedCategory = computed(() => categoryStore.category);

const selectCategory = async (id) => {
  try {
    await categoryStore.fetchCategory(id);
  } catch (err) {
    console.error('Error selecting category:', err);
  }
};

const clearSelection = () => {
  categoryStore.category = null;
};

onMounted(() => {
  categoryStore.fetchCategories();
});
</script>

<style scoped>
.category-container {
  padding: 20px;
  margin-top: 25px; /* Adds space between the header and the content */
}

.loading, .error {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.category-item {
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-item:hover {
  background: #f0f0f0;
}

.category-item h2 {
  font-size: 18px;
  margin: 0;
}

ion-button {
  margin-top: 20px;
}
</style>
