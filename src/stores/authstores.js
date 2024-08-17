// @ts-nocheck
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: safeParse(localStorage.getItem('user')) || null,
    userId: localStorage.getItem('userId') || null
  }),
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('/user/login', { email, password });
        const { user, token, userId } = response.data;
        this.token = token;
        this.user = user;
        this.userId = userId;
        localStorage.setItem('token', token);
        localStorage.setItem('user', safeStringify(user));
        localStorage.setItem('userId', userId);
        return response;
      } catch (error) {
        console.error('Error during login:', error);
        throw error;
      }
    },
    async fetchUserDetails() {
      try {
        const response = await axios.get(`/user/${this.userId}`);
        this.user = response.data;
        localStorage.setItem('user', safeStringify(this.user));
      } catch (error) {
        console.error('Error fetching user details:', error);
        this.user = null;
        localStorage.removeItem('user');
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      this.userId = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    }
  }
});

/**
 * Safely parses a JSON string, replacing undefined values with null.
 * @param {string} jsonString The JSON string to parse.
 * @returns {any} The parsed object, or null if parsing fails.
 */
function safeParse(jsonString) {
  try {
    const jsonLike = jsonString || 'null';
    const placeholder = '"undefined_placeholder"';
    const safeJson = jsonLike.replace(/undefined/gi, placeholder);
    return JSON.parse(safeJson, (key, value) => value === placeholder ? undefined : value);
  } catch (e) {
    console.error("Error parsing JSON:", e);
    return null;
  }
}

/**
 * Safely stringifies an object, replacing undefined values with a placeholder.
 * @param {any} obj The object to stringify.
 * @returns {string} The JSON string representation of the object.
 */
function safeStringify(obj) {
  const placeholder = '"undefined_placeholder"';
  return JSON.stringify(obj, (key, value) => value === undefined ? placeholder : value);
}
