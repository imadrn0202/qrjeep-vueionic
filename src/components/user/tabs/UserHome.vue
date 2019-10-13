<template>
  <ion-grid>
    <ion-col>
            <ion-label>Welcome To User Page</ion-label>
            <ion-item>
                    <ion-button v-on:click="logout" type="submit" color="primary" expand="block">
                        Logout
                    </ion-button>
           </ion-item>
    </ion-col>
</ion-grid>
</template>

<script>


 import { mapState, mapActions } from 'vuex';

export default {
    name: 'UserHome',
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
        }



}
}
</script>
