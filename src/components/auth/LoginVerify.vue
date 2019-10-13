<template>
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
                    <ion-button type="submit" color="primary" expand="block">
                        Verify
                    </ion-button>
                </ion-item>
        </ion-col>
      </ion-row>
      </form>
  </ion-grid>
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
        'validating',
        'validated',
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

