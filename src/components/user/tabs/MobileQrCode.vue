<template>
  <div class="ion-page">

    <ion-content class="ion-padding">

      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content pulling-icon="arrow-dropdown" pulling-text="Pull to refresh" refreshing-spinner="circles"
          refreshing-text="Refreshing...">
        </ion-refresher-content>
      </ion-refresher>

      <ion-grid>
        <ion-col>
          <ion-item>
            <qr-code :text="mobile_number" :size="200" error-level="L">
            </qr-code>

          </ion-item>
        </ion-col>
        <ion-col>
          <ion-item>
            <ion-label>Current Balance:


              <ion-spinner v-if="$store.state.balance.balanceStatus === 'loading'" name="circles"></ion-spinner>
              <ion-text color="success" v-if="$store.state.balance.balanceStatus === 'success'">
                {{ $store.state.balance.balance }} </ion-text>

                <br>
                <br>
                 <ion-text color="primary"> My Number: {{mobile_number }} </ion-text>

            </ion-label>



          </ion-item>
        </ion-col>

      </ion-grid>


    </ion-content>

  </div>
</template>

<script>
  import Vue from 'vue'
  import VueQRCodeComponent from 'vue-qrcode-component'
  Vue.component('qr-code', VueQRCodeComponent)
  import {
    mapState,
    mapActions
  } from 'vuex';
  export default {

    name: 'MobileQrCode',
    data() {
      return {
        mobile_number: localStorage.getItem('mobile_number'),
      }
    },
    methods: {
      ...mapState([
        'status',
        'token',
        'balance'
      ]),
      ...mapActions([
        'checkBalance'
      ]),

      getBalance() {
        this.checkBalance()
      },
      doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
          console.log('Async operation has ended');
          this.getBalance();
          event.target.complete();
        }, 2000);
      },


    },
    beforeMount() {
      this.getBalance()
    },

  }
</script>