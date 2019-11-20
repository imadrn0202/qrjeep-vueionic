<template>
    <div class="ion-page">


        <ion-content class="ion-padding">

            <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content pulling-icon="arrow-dropdown" pulling-text="Pull to refresh" refreshing-spinner="circles"
          refreshing-text="Refreshing...">
        </ion-refresher-content>
      </ion-refresher>
      
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
                            <ion-button :disabled="$store.state.balance.paypalStatus === 'loading'" type="submit"
                                color="primary" expand="block">
                                Checkout via Paypal
                            </ion-button>
                        </ion-item>
                        <ion-item>

                           <ion-label>Current Balance:


                            <ion-spinner v-if="$store.state.balance.balanceStatus === 'loading'" name="circles"></ion-spinner>
                            <ion-text color="success" v-if="$store.state.balance.balanceStatus === 'success'">
                                {{ formatPrice($store.state.balance.balance) }} </ion-text>

                            </ion-label>



                            <ion-text v-if="$store.state.balance.paypalStatus === 'loading'" color="success">
                                <p>Redirecting . . . Please Wait</p>
                                <ion-spinner name="circles"></ion-spinner>
                            </ion-text>

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
                'onAddBalancePaypalSubmit',
                'checkBalance'
            ]),
            formatPrice(value) {
                let val = (value/1).toFixed(2).replace('.', '.')
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },

            getBalance() {
                this.checkBalance()
            },


            onSubmit() {
                this.onAddBalancePaypalSubmit({
                    amount: this.amount,
                    mobile_number: localStorage.getItem('mobile_number')
                });
            },
            doRefresh(event) {
                console.log('Begin async operation');

                setTimeout(() => {
                    console.log('Async operation has ended');
                    this.getBalance();
                    event.target.complete();
                }, 2000);
            },


        },
        beforeMount() {
            this.getBalance()
        },

    }
</script>