<template>
    <div class="ion-page">
        <ion-content class="ion-padding">
            <ion-grid>
                <form @submit.prevent="onSubmit">
                    <ion-col>
                        <ion-item>
                            <ion-label>Scanned Mobile Number: </ion-label>
                            <ion-input :value="scan_mobile_number" type="text" name="mobile_number"></ion-input>
                        </ion-item>
                    </ion-col>
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
                                Next
                            </ion-button>
                            <ion-text v-if="$store.state.balance.status === 'error'" color="danger">
                                <p>Mobile is Invalid</p>
                            </ion-text>
                            <ion-text v-if="$store.state.balance.status === 'success'" color="success">
                                <p>You have successfully added a balance to {{ scan_mobile_number }}</p>
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
        name: 'AddBalance',
        data() {
            return {
                scan_mobile_number: this.$route.query.scanned_mobile,
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
                'onAddBalanceSubmit'
            ]),

            onSubmit() {
                this.onAddBalanceSubmit({
                    scan_mobile_number: this.scan_mobile_number,
                    amount: this.amount
                });
            }


        }
    }
</script>