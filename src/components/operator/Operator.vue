<template>
    <div class="ion-page">
    <!-- Listen to before and after tab change events -->
    <ion-tabs>
      <ion-tab tab="operator" :routes="'operator'">
        <ion-header>
          <ion-toolbar>
            <ion-title>QR Jeep - Operator</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <OperatorHome />
        </ion-content>
      </ion-tab>



      
      <!-- Use v-slot:bottom with Vue ^2.6.0 -->
      <template slot="bottom">
        <ion-tab-bar>
          <ion-tab-button tab="operator" :to="{ name: 'operator' }">
            <ion-icon name="apps"></ion-icon>
            <ion-label>Home</ion-label>
            <ion-badge>6</ion-badge>
          </ion-tab-button>

        </ion-tab-bar>
      </template>
    </ion-tabs>
  </div>
</template>

<script>
  /* eslint-disable */
  import OperatorHome from './tabs/OperatorHome'
  export default {
    name: 'Operator',
    components: {
      OperatorHome
    },
    data() {
      return {
        scanned_mobile: '',
      }
    },
    methods: {
      scan() {
        cordova.plugins.barcodeScanner.scan(
          result => {

            this.scanned_mobile = result.text

            this.$router.push({
              path: 'AddBalance',
              query: {
                scanned_mobile: this.scanned_mobile
              }
            })


          },
          function (error) {
            alert("Scanning failed: " + error);
          }, {
            preferFrontCamera: false, // iOS and Android
            showFlipCameraButton: true, // iOS and Android
            showTorchButton: false, // iOS and Android
            torchOn: true, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: "Place a QR Code inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
            disableSuccessBeep: false // iOS and Android
          }
        );
      },

    }
  }
</script>