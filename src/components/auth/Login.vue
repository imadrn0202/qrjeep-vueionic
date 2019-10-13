<template>
<ion-grid>
    <form @submit.prevent="onLoginSubmit">
            <ion-col>
                <ion-item>
                    <ion-label>SMS: </ion-label>
                    <ion-input :value="mobileNumber" @input="mobileNumber = $event.target.value" type="text" name="mobileNumber"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Password: </ion-label>
                    <ion-input type="password" name="password"></ion-input>
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-item>
                    <ion-button type="submit" color="primary" expand="block">
                        {{ plan }}
                    </ion-button>
                </ion-item>
            </ion-col>
    </form>
</ion-grid>
</template>

<script>
export default {

    name: 'Login',
    data() {
      return {
        mobileNumber: '',
        plan: this.$route.query.mobile_number,
        password: ''
      }
    },
 
}
</script>