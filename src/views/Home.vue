<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>QR Jeep</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <Login/>
    </ion-content>
  </div>
</template>

<script>
// @ is an alias to /src

import Login from '../components/Login'
export default {
  name: 'home',
  components: {
    Login
  }
}
</script>
