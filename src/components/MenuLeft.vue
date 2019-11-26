<template>
    <ion-menu side="start">
        <ion-header>
            <ion-toolbar color="secondary">
                <ion-title>BITSAI - Users</ion-title>
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
                    <router-link class="no-underline" to="/user/fare/type">
                        <ion-label color="dark">Pay</ion-label>
                    </router-link>
                </ion-item>
                 <ion-item>
                    <router-link class="no-underline" to="/user/qrcode">
                        <ion-label color="dark">Balance / QR</ion-label>
                    </router-link>
                </ion-item>

                <ion-item>
                    <router-link class="no-underline" to="/user/paypal">
                        <ion-label color="dark">Add Balance via Paypal</ion-label>
                    </router-link>
                </ion-item>

                <ion-item>
                    <router-link class="no-underline" to="/user/farelogs">
                        <ion-label color="dark">My Fare Logs</ion-label>
                    </router-link>
                </ion-item>

                <ion-item>
                    <router-link class="no-underline" to="/user/transactionlogs">
                        <ion-label color="dark">My Transaction/Load Logs</ion-label>
                    </router-link>
                </ion-item>

                <ion-item>
                    <router-link class="no-underline" to="/user/addemail">
                        <ion-label color="dark">Add Email</ion-label>
                    </router-link>
                </ion-item>

                <ion-item>
                    <ion-button no-lines v-on:click="logout" type="submit" color="danger">
                        Logout
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
    '$route' () {
        document.querySelector('ion-menu-controller').close('start')
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
     }
}
</script>
<style>
    .no-underline {
        text-decoration: none !important;
    }
</style>