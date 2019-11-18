<template>
    <div class="ion-page">

                <ion-content class="ion-padding">
                    <ion-grid>
                        <form @submit.prevent="onSubmit">
                            <ion-col>
                                <ion-item>
                                    <ion-label>Firstname: </ion-label>
                                    <ion-input :value="firstName" @input="firstName = $event.target.value" type="text"
                                        name="mobile_number"></ion-input>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-label>Lastname: </ion-label>
                                    <ion-input :value="lastName" @input="lastName = $event.target.value" type="text"
                                        name="mobile_number"></ion-input>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-label>Plate Number: </ion-label>
                                    <ion-input :value="plateNumber" @input="plateNumber = $event.target.value" type="text"
                                        name="mobile_number"></ion-input>
                                </ion-item>
                            </ion-col>
                            <ion-col>
                                <ion-item>
                                    <ion-button :disabled="$store.state.operator.createDriverStatus === 'loading'" type="submit" color="primary" expand="block">
                                        Create Driver
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
        name: 'CreateDriver',
        data() {
            return {
                first_name: this.firstName,
                last_name: this.lastName,
                plate_number: this.plateNumber

            }
        },
        computed: {
            ...mapState([
                'status'
            ]),
        },
        methods: {
            ...mapActions([
                'onCreateDriverSubmit'
            ]),

            onSubmit() {
                this.onCreateDriverSubmit({
                    first_name: this.firstName,
                    last_name: this.lastName,
                    plate_number: this.plateNumber
                });
            }


        }
    }
</script>