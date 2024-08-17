import { defineStore } from 'pinia';
import axios from 'axios';


export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    loading: false,
  }),
  actions: {
    async fetchProducts() {
      try {
        this.loading = true;
        const response = await axios.get('/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.loading = false;
      }
    },
    addToCart(product) {
      // Implement add to cart functionality here
      console.log(`Product added to cart: ${product.name}`);
    }
  }
});
