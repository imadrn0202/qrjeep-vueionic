<template>
  <ion-grid>
    <ion-col>
            <ion-label>Welcome To Fare Matrix Page</ion-label>

              <ion-item>
                    <ion-label>Origin</ion-label>
                    <ion-select
                        placeholder="Select One"
                        :value="selectedOrigin"
                        @ionChange="selectedOrigin= $event.target.value"
                    >
                        <ion-select-option disabled v-if="$store.state.fare.onOriginStatus === 'loading'">
                                Loading . . .
                        </ion-select-option>

                        <ion-select-option
                        v-for="(item, index) in $store.state.fare.origins"
                        :key="index"
                        :value="item.origin"
                        >{{ item.origin }}</ion-select-option>
                    </ion-select>
                    </ion-item>

                    <ion-item>
                    <ion-label>Destination</ion-label>
                    <ion-select
                        
                       :disabled="!selectedOrigin"
                        placeholder="Select One"
                        :value="selectedDestination"
                        @ionChange="selectedDestination= $event.target.value"
                    >

                         <ion-select-option disabled v-if="$store.state.fare.onDestinationStatus === 'loading'">
                                Loading . . .
                        </ion-select-option>


                        <ion-select-option 
                        :disabled="$store.state.fare.onDestinationStatus === 'loading'"
                        v-for="(item, index) in $store.state.fare.destinations"
                        :key="index"
                        :value="item.destination"
                        >{{ item.destination }}</ion-select-option>
                    </ion-select>
                    </ion-item>

                 

                  
                 <ion-item>
                    <ion-label>Quantity: </ion-label>
                    <ion-input  :value="qty" @input="qty = $event.target.value" type="number" name="qty"></ion-input>
                </ion-item>
            <ion-item>
                <ion-label>Price:

                  <ion-spinner v-if="$store.state.fare.onGetFareStatus === 'loading'" name="circles"></ion-spinner>
               

                    <ion-text color="danger" v-if="$store.state.fare.onGetFareStatus === 'success'">
                    {{ $store.getters.getFare }} </ion-text>
      

                </ion-label>



              </ion-item>

              <ion-item>
                <ion-label>Current Balance:


                  <ion-spinner v-if="$store.state.balance.balanceStatus === 'loading'" name="circles"></ion-spinner>
                  <ion-text color="success" v-if="$store.state.balance.balanceStatus === 'success'">
                    {{ $store.state.balance.balance }} </ion-text>

                </ion-label>



              </ion-item>

              <ion-col>
              <ion-item>
                <ion-button :disabled="Math.round(parseFloat($store.getters.getFare)*100)/100 > Math.round(parseFloat($store.state.balance.balance)*100)/100 || selectedDestination === '' || $store.state.fare.onGetFareStatus === 'loading' " @click="scan()">PAY NOW   <ion-icon name="qr-scanner"></ion-icon></ion-button>
              </ion-item>
            </ion-col>
    </ion-col>
</ion-grid>
</template>

<script>
/* eslint-disable */ 
  import {
    mapState,
    mapActions,
    mapGetters
  } from 'vuex';
  export default {

    name: 'FareMatrix',
    data() {
        return {
             selectedOrigin: '',
             selectedDestination: '',
             qty: 1,
             type: this.$route.query.type,
             driver_id: 0,
        }
    },

    computed: {
    ...mapGetters([
      'getFare'
    ])
    },


    
    methods: {
      
      ...mapActions([
        'onOriginSelect',
        'onDestinationSelect',
        'onGetFare',
        'onPayFare',
        'checkBalance'
      ]),

      getBalance() {
        this.checkBalance()
      },

      getOrigins() {
        this.onOriginSelect()
      },

      scan() {
        cordova.plugins.barcodeScanner.scan(
          result => {

            this.driver_id = result.text

            this.onPayFare({
              driver_id: this.driver_id,
              origin: this.selectedOrigin,
              destination: this.selectedDestination,
              qty: this.qty,
              type: this.type
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

      

    },
    beforeMount() {
        this.getOrigins();
        this.getBalance()
    },

    watch: {
        selectedOrigin: function(val) {
            //do something when the data changes.
            if (val) {
                
                this.selectedDestination =  '';

                this.onDestinationSelect({
                    origin: this.selectedOrigin
                })

            }
        },

        selectedDestination: function(val) {
            //do something when the data changes.
            if (val) {
                this.onGetFare({
                    origin: this.selectedOrigin,
                    destination: this.selectedDestination,
                    qty: this.qty,
                    type: this.type
                })



            }
        },
        qty: function(val) {
          if (val) {
           this.onGetFare({
                    origin: this.selectedOrigin,
                    destination: this.selectedDestination,
                    qty: this.qty,
                    type: this.type
                })

          }
      
        }
    }

  }
</script>
