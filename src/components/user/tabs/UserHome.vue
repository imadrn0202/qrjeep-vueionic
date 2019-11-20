<template >
  <ion-grid>
    <ion-col>
            <ion-label>Welcome To User Page</ion-label>
            <ion-item><img src="../../../assets/Ph_seal_Imus.png"></ion-item>
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
