// @ts-nocheck
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { IonicVue } from '@ionic/vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { addIcons } from 'ionicons';
import { personCircleOutline, pricetagsOutline, listOutline, cartOutline, homeOutline } from 'ionicons/icons';
import { createPinia } from 'pinia';

// Ionic CSS files
import '@ionic/vue/css/core.css';
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

// Theme variables
import './theme/variables.css';
import { useAuthStore } from './stores/authstores';

// Create Pinia instance
const pinia = createPinia();

// Axios defau slt configuration
axios.defaults.baseURL = 'https://e-commerce-api-kufk.onrender.com/api/v1/';

// Register icons
addIcons({
  'person-circle-outline': personCircleOutline,
  'pricetags-outline': pricetagsOutline,
  'list-outline': listOutline,
  'cart-outline': cartOutline,
  'home-outline': homeOutline,
});

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueAxios, axios)
  .use(pinia);

// Update Axios headers based on token in Pinia store
const authStore = useAuthStore();
if (authStore.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
}

router.isReady().then(() => {
  app.mount('#app');
});
