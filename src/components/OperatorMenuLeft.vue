    <template>
      <ion-menu side="start">
        <ion-header>
          <ion-toolbar color="secondary">
            <ion-title>BITSAI - Operators</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding>
          <ion-list no-lines>

            <ion-item>
              <router-link class="no-underline" to="/usertype">
                <ion-label color="dark">Select User type</ion-label>
              </router-link>
            </ion-item>

            <ion-item>
              <router-link class="no-underline" to="/operator/driverlist">
                <ion-label color="dark"> My Driver List</ion-label>
              </router-link>
            </ion-item>

            <ion-item>
              <router-link class="no-underline" to="/operator/createdriver">
                <ion-label color="dark">Create Driver</ion-label>
              </router-link>
            </ion-item>

            <ion-item>
              <router-link class="no-underline" to="/operator/dailyreport">
                <ion-label color="dark"> Daily Reports </ion-label>
              </router-link>
            </ion-item>


            <ion-item>
              <ion-button v-on:click="logout" type="submit" color="danger" expand="block">
                Logout
              </ion-button>
            </ion-item>

            <ion-item>
              <ion-button color="success" @click="scan()">Add Balance <ion-icon name="qr-scanner"></ion-icon>
              </ion-button>
            </ion-item>

          </ion-list>
        </ion-content>
      </ion-menu>

    </template>
    <script>
      import {
        mapState,
        mapActions
      } from 'vuex';
      export default {
        watch: {
          '$route'() {
            document.querySelector('ion-menu-controller').close('start')
          }
        },

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
            // eslint-disable-next-line
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
    <style scoped>
      .no-underline {
        text-decoration: none !important;
      }
    </style>