<template>
    <div class="ion-page">

                <ion-header>
                    <ion-toolbar>
                        <ion-title>QR Jeep - User</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-grid>
                        <form @submit.prevent="onSubmit">
                            <ion-col>
                                <ion-item>
                                    <ion-label>Amount: </ion-label>
                                    <ion-input :value="amount" @input="amount = $event.target.value" type="text"
                                        name="mobile_number"></ion-input>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-button type="submit" color="primary" expand="block">
                                        Checkout via Paypal
                                    </ion-button>
                                </ion-item>
                            </ion-col>
                        </form>
                    </ion-grid>
                </ion-content>
    </div>
</template>

<script>
    import {
        mapState,
        mapActions
    } from 'vuex';
    export default {
        name: 'AddBalancePaypal',
        data() {
            return {
                amount: 1
            }
        },
        computed: {
            ...mapState([
                'status'
            ]),
        },
        methods: {
            ...mapActions([
                'onAddBalancePaypalSubmit'
            ]),

            onSubmit() {
                this.onAddBalancePaypalSubmit({
                    amount: this.amount
                });
            }


        }
    }
</script>