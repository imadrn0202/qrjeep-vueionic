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
                    <ion-button type="submit" color="primary" expand="block">
                        Next
                    </ion-button>
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