<template>
  <ion-page>
    <ion-content class="product-content">
      <div class="product-list">
        <!-- Show a loading message while products are being fetched -->
        <div v-if="loading" class="loading">Loading products...</div>
        <!-- Display the products once they are loaded -->
        <div v-else class="products">
          <div v-for="product in products" :key="product._id" class="product-card">
            <img :src="product.productImage.productImg || dummyImage" alt="Product Image" />
            <h2>{{ product.name }}</h2>
            <p>{{ product.description }}</p>
            <ion-button @click="addToCart(product)" expand="full" class="animated-button">
              Add to Cart
            </ion-button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useCartStore } from '../stores/cartStores';
import {
  IonPage,
  IonContent,
  IonButton,
} from '@ionic/vue';

// Access the Pinia stores
const productStore = useProductStore();
const cartStore = useCartStore();

const dummyImage = 'https://via.placeholder.com/150';

// Computed properties to access the product store's state
const products = computed(() => productStore.products);
const loading = computed(() => productStore.loading);

// Fetch products when the component is mounted
onMounted(() => {
  productStore.fetchProducts();
});

// Add a product to the cart using the cart store
const addToCart = async (product) => {
  try {
    await cartStore.addToCart(product._id, 1); // Pass product ID and quantity
    console.log(`Product added to cart: ${product.name}`);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
</script>

<style scoped>
.product-content {
  padding-bottom: 100px; /* Increase the bottom padding to ensure content is above the footer */
}

.product-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
}

.products {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns layout */
  gap: 16px;
  width: 100%;
  max-width: 1200px;
}

.product-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.product-card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 8px;
}

.product-card h2 {
  font-size: 18px;
  margin: 8px 0;
}

.product-card p {
  font-size: 14px;
  color: #666;
}

.product-card:hover {
  transform: translateY(-10px);
}

.animated-button {
  --background: #007bff;
  --background-hover: #0056b3;
  --background-focused: #004494;
  transition: background-color 0.3s, transform 0.3s;
}

.animated-button:hover {
  background-color: var(--background-hover);
  transform: scale(1.05);
}

.loading {
  font-size: 18px;
  margin-top: 20px;
}
</style>

