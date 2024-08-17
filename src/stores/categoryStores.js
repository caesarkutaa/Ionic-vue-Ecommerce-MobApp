// stores/categoryStore.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    category: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCategories() {
      try {
        this.loading = true;
        console.log(this.categories)
        const response = await axios.get('/category');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.error = error.response?.data?.message || 'Failed to fetch categories';
      } finally {
        this.loading = false;
      }
    },

    async fetchCategory(id) {
      try {
        this.loading = true;
        const response = await axios.get(`/category/${id}`);
        this.category = response.data;
      } catch (error) {
        console.error('Error fetching category:', error);
        this.error = error.response?.data?.message || 'Failed to fetch category';
      } finally {
        this.loading = false;
      }
    },
  },
});
