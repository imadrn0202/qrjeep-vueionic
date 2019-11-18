<template>
  <ion-grid>
    <ion-col>
      <ion-label>Welcome To Operator Page</ion-label>

    </ion-col>
  </ion-grid>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex';
  /* eslint-disable */
  export default {

    name: 'MobileQrCode',
    data() {
      return {
        scanned_mobile: '',
      }
    },
    methods: {
      ...mapState([
        'status',
        'token',
      ]),
      ...mapActions([
        'onLogout'
      ]),

      logout() {
        this.onLogout();
      },



      scan() {
        cordova.plugins.barcodeScanner.scan(
          result => {

            this.scanned_mobile = result.text

            this.$router.push({
              path: '/operator/addbalance',
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
            showTorchButton: true, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt: "Place a QR Code inside the scan area", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            formats: "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
            orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableSuccessBeep: false // iOS and Android
          }
        );
      },

    }

  }
</script>