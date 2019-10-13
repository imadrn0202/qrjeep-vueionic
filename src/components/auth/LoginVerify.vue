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
                    <ion-label>SMS Code: </ion-label>
                    <ion-input :value="sms_verification_code" @input="sms_verification_code = $event.target.value" type="text" name="sms_verification_code"></ion-input>
                </ion-item>
          </ion-col>
         <ion-col>
                <ion-item>
                    <ion-button type="submit" color="primary" expand="block" :disabled="status === 'loading'">
                        Verify
                    </ion-button>
                  <ion-text v-if="status === 'invalid'" color="danger">
                    <p>SMS Code is Invalid</p>
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
import { mapState, mapActions } from 'vuex';

export default {
    name: 'LoginVerify',
    data() {
      return {
        mobile_number: this.$route.query.mobile_number,
        sms_verification_code: ''
      }
    },
    computed: {
      ...mapState([
        'status',
        'token',
        'validating',
      ]),
      
    },
    methods: {
      ...mapActions([
        'onLoginVerify'
      ]),


      onSubmit() {
        this.onLoginVerify({ 
             mobile_number: this.mobile_number,
             sms_verification_code: this.sms_verification_code
        });
      }
    }


}
</script>

