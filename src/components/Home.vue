<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>BITSAI</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <checkNumber/>
    </ion-content>
  </div>
</template>

<script>
// @ is an alias to /src

import CheckNumber from './auth/CheckNumber'
export default {
  name: 'home',
  components: {
    CheckNumber
  }
}
</script>
