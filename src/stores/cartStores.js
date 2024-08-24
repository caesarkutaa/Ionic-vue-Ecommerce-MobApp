// @ts-nocheck
// stores/cartStores.js
// @ts-nocheck
// stores/cartStores.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './authstores';
import { toastController } from '@ionic/vue';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCart() {
      const authStore = useAuthStore();
      if (!authStore.token) {
        this.error = 'User is not authenticated';
        return;
        console.log(this.error)
      }

      try {
        this.loading = true;
        const response = await axios.get(`/cart`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        if (response.data) {
          this.cart = response.data;
        } else {
          this.cart = [];
          this.error = 'Unexpected response format';
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        this.error = error.response?.data?.message || 'Failed to fetch cart';
      } finally {
        this.loading = false;
      }
    },

    async addToCart(productId, quantity = 1) {
      const authStore = useAuthStore();
      if (!authStore.token) {
        this.error = 'User is not authenticated';
        return;
      }

      try {
        this.loading = true;
        const response = await axios.post(`/cart/${productId}`, null, {
          params: { quantity },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });  

        if (response.data) {
          this.cart = response.data.data;
          
          // Show success message
          const toast = await toastController.create({
            message: 'Item added to cart!',
            duration: 2000,
            color: 'success',
          });
          toast.present();
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        this.error = error.response?.data?.message || 'Failed to add to cart';
      } finally {
        this.loading = false;
      }
    },
    async removeFromCart(productId, quantity = 1) {
      const authStore = useAuthStore();
      if (!authStore.token) {
        this.error = 'User is not authenticated';
        return;
      }
    
      try {
        this.loading = true;
    
        // Send delete request to the server
        const response = await axios.delete(`/cart/delete/${productId}`, {
          params: { quantity },
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        });
    
        if (response.status === 200) {
          // Fetch the latest cart data from the server after removal
          await this.fetchCart();
    
          // Show success message
          const toast = await toastController.create({
            message: 'Product removed successfully!',
            duration: 2000,
            color: 'success',
          });
          toast.present();
        } else {
          throw new Error('Failed to remove product from cart');
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        this.error = error.response?.data?.message || 'Failed to remove from cart';
      } finally {
        this.loading = false;
      }
    }
    
    
  
  },
});
