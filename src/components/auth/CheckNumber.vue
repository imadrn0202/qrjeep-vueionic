<template>
<ion-grid>
    <form @submit.prevent="onSubmit">
            <ion-col>
                <ion-item>
                    <ion-label>Mobile Number: </ion-label>
                    <ion-input :value="mobile_number" @input="mobile_number = $event.target.value" type="text" name="mobile_number"></ion-input>
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-item>
                    <ion-button type="submit" color="primary" expand="block" :disabled="validateMobile == false || $store.state.checknumber.status === 'loading'" >
                        Next
                    </ion-button>
                    <ion-text v-if="$store.state.checknumber.status === 'error'" color="danger">
                    <p>Number is Invalid</p>
                  </ion-text>

                  <ion-text  v-if="validateMobile == false" color="danger">
                      <p>{{validationMessage}}</p>
                  </ion-text>

                </ion-item>
            </ion-col>
    </form>
</ion-grid>
</template>

<script>

 import { mapState, mapActions } from 'vuex';

export default {
    name: 'CheckNumber',
    data() {
      return {
        mobile_number: '',
         validateMobile: '',
      }
    },
    computed: {
      ...mapState([
        'status'
      ]),
      validationMessage: function () {
                var re = /^(639)\d{9}$/g;


                if (re.test(this.mobile_number)) {
                    // eslint-disable-next-line
                    this.validateMobile = true
                    return;

                } else {
                    // eslint-disable-next-line
                    this.validateMobile = false
                    return 'ex: 639231622739';
                }


            },
    },
    methods: {
      ...mapActions([
        'onCheckMobileNumberSubmit'
      ]),


      onSubmit() {
        this.onCheckMobileNumberSubmit({ 
             mobile_number: this.mobile_number
        });
      }
    }
}
</script>