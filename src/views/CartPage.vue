<template>
  <ion-page>
    <ion-content class="cart-content">
      <div class="cart-container">
        <!-- If the user is not logged in, show a message -->
        <div v-if="!isLoggedIn" class="not-logged-in">
          <h2>Please log in to view your cart.</h2>
          <ion-button @click="redirectToLogin" expand="block" color="primary">
            Go to Login
          </ion-button>
        </div>

        <!-- If the cart is loading, show a loading message -->
        <div v-else-if="loading" class="loading">Loading your cart...</div>

        <!-- If there's an error, show the error message -->
        <div v-else-if="error" class="error">{{ error }}</div>

        <!-- If the cart is empty, show a message -->
        <div v-else-if="cart.length === 0" class="empty-cart">
          Your cart is empty.
        </div>

        <!-- Otherwise, show the cart items and Proceed to Payment button -->
        <div v-else>
          <div v-for="item in cart" :key="item._id" class="cart-item">
            <img 
              v-if="item.product && item.product.productImage && item.product.productImage.productImg" 
              :src="item.product.productImage.productImg" 
              alt="Product Image" 
            />
            <div class="item-details">
              <h2>{{ item.product?.name || 'Unnamed Product' }}</h2>
              <p>Quantity: {{ item.quantity }}</p>
              <p>Total: ${{ item.quantity * item.product?.price || 0 }}</p>
              <ion-button @click="removeItem(item.product._id)" expand="block" color="danger">
                Remove
              </ion-button>
            </div>
          </div>

          <!-- Payment button, shown only if user is logged in -->
          <ion-button v-if="isLoggedIn" @click="goToPayment" expand="block" color="success" class="payment-button">
            Proceed to Payment
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useCartStore } from '../stores/cartStores';
import { useAuthStore } from '../stores/authstores';
import { useRouter } from 'vue-router';
import { IonPage, IonContent, IonButton } from '@ionic/vue';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const isLoggedIn = computed(() => !!authStore.token); // Check if the user is logged in
const loading = computed(() => cartStore.loading);
const cart = computed(() => cartStore.cart);
const error = computed(() => cartStore.error);

const removeItem = (productId) => {
  if (!productId) {
    console.error('Invalid product ID:', productId);
    return;
  }
  cartStore.removeFromCart(productId);
};

const redirectToLogin = () => {
  router.push('/login'); // Redirect to the login page
};

const goToPayment = () => {
  router.push('/payment'); // Redirect to the payment page
};

onMounted(() => {
  if (isLoggedIn.value) {
    cartStore.fetchCart();
  }
});
</script>

<style scoped>
.cart-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: relative;
  z-index: 10;
}

.cart-content {
  --padding-bottom: 56px;
}

.loading, .error, .empty-cart, .not-logged-in {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}

.not-logged-in h2 {
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item img {
  width: 150px;
  height: auto;
  border-radius: 8px;
  margin-right: 16px;
}

.item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-details h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.item-details p {
  font-size: 16px;
  margin: 4px 0;
}

.payment-button {
  margin-bottom: 20px;
  z-index: 10;
  --background: #28a745;
  --background-hover: #218838;
}
</style>
