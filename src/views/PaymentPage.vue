<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Payment</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="payment-content">
      <div class="payment-container">
        <!-- Bitcoin Address Section -->
        <div class="crypto-address">
          <h2>Bitcoin Address</h2>
          <p>{{ bitcoinAddress }}</p>
          <ion-button @click="copyToClipboard(bitcoinAddress)" color="primary">
            Copy Bitcoin Address
          </ion-button>
        </div>

        <!-- Ethereum Address Section -->
        <div class="crypto-address">
          <h2>Ethereum Address</h2>
          <p>{{ ethereumAddress }}</p>
          <ion-button @click="copyToClipboard(ethereumAddress)" color="primary">
            Copy Ethereum Address
          </ion-button>
        </div>

        <!-- Solana Address Section -->
        <div class="crypto-address">
          <h2>Solana Address</h2>
          <p>{{ solanaAddress }}</p>
          <ion-button @click="copyToClipboard(solanaAddress)" color="primary">
            Copy Solana Address
          </ion-button>
        </div>

        <!-- Payment Details Section -->
        <div class="payment-details">
          <ion-item>
            <ion-label position="floating"></ion-label>
            <ion-input v-model="paymentAmount" type="number" placeholder="Enter amount"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="floating"></ion-label>
            <ion-textarea v-model="paymentNote" placeholder="Enter payment note"></ion-textarea>
          </ion-item>

          <ion-button @click="submitPayment" expand="block" color="success">
            Submit Payment
          </ion-button>

          <div v-if="paymentStatus" class="payment-status">
            <p>Status: {{ paymentStatus }}</p>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonTextarea } from '@ionic/vue';

// Mock addresses
const bitcoinAddress = ref('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
const ethereumAddress = ref('0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe');
const solanaAddress = ref('4eTJrFY8pK7qRMNhA5w6GVu1NyFSozDA5iFQ65F7EEeb');

// Payment data
const paymentAmount = ref(null);
const paymentNote = ref('');
const paymentStatus = ref(null);

const copyToClipboard = (address) => {
  navigator.clipboard.writeText(address).then(() => {
    alert('Address copied to clipboard');
  });
};

const submitPayment = () => {
  if (!paymentAmount.value || !paymentNote.value) {
    alert('Please fill in all fields');
    return;
  }

  // Simulate payment submission and set status to pending
  paymentStatus.value = 'Pending';
  // Here, you would normally send this data to your server
};
</script>

<style scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.crypto-address {
  margin-bottom: 20px;
}

.crypto-address h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.payment-details {
  margin-top: 20px;
}

.payment-status {
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  color: orange;
}
</style>
