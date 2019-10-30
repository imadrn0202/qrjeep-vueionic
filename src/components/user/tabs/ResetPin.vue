<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>QR Jeep</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
          <ion-grid>
      <form @submit.prevent="onSubmit">
      <ion-row>
          <ion-col size="12">
              <ion-item>
                    <ion-label>Pin Verification Code: </ion-label>
                    <ion-input :value="code" @input="code = $event.target.value" type="text" name="code"></ion-input>
                </ion-item>
          </ion-col>
         <ion-col>
                <ion-item>
                    <ion-button type="submit" color="primary" expand="block" :disabled="$store.state.pin.resetPinStatus === 'loading'">
                        Verify
                    </ion-button>
                  <ion-text v-if="$store.state.pin.resetPinStatus === 'invalid'" color="danger">
                    <p>Pin Verification Code is Invalid</p>
                  </ion-text>
                </ion-item>
        </ion-col>
      </ion-row>
      </form>
  </ion-grid>
    </ion-content>
  </div>

</template>

<script>

import {mapActions} from 'vuex'
export default {

    name: 'ResetPin',
    data() {
      return {
        code: '',
      }
    },
    methods: {
      ...mapActions([
        'onPinVerificationSubmit'
    ]),
    onSubmit() {
           this.onPinVerificationSubmit({
             code: this.code
           })
    },


}
}
</script>
