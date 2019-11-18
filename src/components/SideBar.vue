<template>
  <div class="ion-page" main>
    <ion-header>
      <ion-toolbar>
        <ion-item>
          <ion-button @click="openStart">Menu</ion-button>
            <ion-title>QR Jeep</ion-title>
            </ion-item>
      </ion-toolbar>
    </ion-header>
  <ion-content>
       <ion-vue-router/>
  </ion-content>
  </div>
</template>

<script>
export default {
  methods: {
    openStart () {
      document.querySelector('ion-menu-controller').open('start')
    },
    
  }
}
</script>