<template>
  <div class="ion-page">
    <!-- Listen to before and after tab change events -->
    <ion-tabs>
      <ion-tab tab="user" :routes="'user'">
        <ion-header>
          <ion-toolbar>
            <ion-title>QR Jeep</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <UserHome />
        </ion-content>
      </ion-tab>

      <!-- Match by "app.speakers" route name -->
      <ion-tab tab="qrcode" :routes="'mobileqrcode'">
        <ion-header>
          <ion-toolbar>
            <ion-title>QR Jeep</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <MobileQrCode />
        </ion-content>
      </ion-tab>
      <!-- Use v-slot:bottom with Vue ^2.6.0 -->
      <template slot="bottom">
        <ion-tab-bar>
          <ion-tab-button tab="user" :to="{ name: 'user' }">
            <ion-icon name="apps"></ion-icon>
            <ion-label>Home</ion-label>
            <ion-badge>6</ion-badge>
          </ion-tab-button>

          <!-- Provide a custom route to navigate to -->
          <ion-tab-button tab="qrcode" :to="{ name: 'mobileqrcode' }">
            <ion-icon name="medical"></ion-icon>
            <ion-label>Balance</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </template>
    </ion-tabs>
  </div>
</template>

<script>
  import UserHome from './tabs/UserHome'
  import MobileQrCode from './tabs/MobileQrCode'
  export default {
    name: 'User',
    components: {
      UserHome,
      MobileQrCode
    },
  }
</script>