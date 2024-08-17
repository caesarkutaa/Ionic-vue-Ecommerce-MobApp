<template>
  <ion-page>

    <ion-content>
      <div class="product-list">
        <div v-if="loading" class="loading">Loading products...</div>
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
import { ref, onMounted } from 'vue';
import { useProductStore } from '../stores/productStore'; // Ensure this path is correct
import { useCartStore } from '../stores/cartStores'; // Ensure this path is correct
import axios from 'axios';
import {
  IonPage,
  IonContent,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';

// Access the Pinia stores
const productStore = useProductStore();
const cartStore = useCartStore();

const dummyImage = 'https://via.placeholder.com/150';
const loading = ref(true);
const products = ref([]);

const fetchProducts = async () => {
  try {
    loading.value = true;
    const response = await axios.get('/products');
    products.value = response.data;
    productStore.products = response.data; // Optionally update Pinia store
  } catch (error) {
    console.error('Error fetching products:', error);
    // Optionally show an error message to the user
  } finally {
    loading.value = false;
  }
};
console.log(cartStore); // Check if cartStore is properly instantiated
console.log(cartStore.addToCart); // Ensure addToCart is a function


const addToCart = async (product) => {
  try {
    await cartStore.addToCart(product._id, 1); // Pass product ID and quantity
    console.log(`Product added to cart: ${product.name}`);
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};


// Fetch products when component is mounted
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
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
