
<template>
  <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app>
</template>

<script>
import { defineComponent } from 'vue';
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    createPinia, PiniaVuePlugin
  }
});
</script>

